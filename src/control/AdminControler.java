package control;

import BaseDeDonneConfig.DataPath;
import BaseDeDonneConfig.RechercherMembre;
import moudel.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class AdminControler {
    @RequestMapping("/AdminHomePage")
    public String homePage(HttpSession session, Model model) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        model.addAttribute("stat", admin.statistique());
        return "AdminPages/AdminHomePage";
    }

    @RequestMapping("/AdminServicePage")
    public String servicepag(Model model, HttpSession session) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        model.addAttribute("services", admin.ListService());
        return "AdminPages/AdminService";
    }

    @RequestMapping("/AdminMembrePage")
    public String membrePage(HttpSession session) {
        if (!testSession(session))
            return "login";
        return "AdminPages/AdminMembre";
    }

    @RequestMapping(value = "/AdminSuppremerMembre" ,method = POST)
    public String SuppremerMembre(HttpSession session, @RequestParam("id") Long id, @RequestParam("type") String type) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        admin.suppremeMembre(id, type);
        return "AdminPages/AdminMembre";
    }

    @RequestMapping("/AdminChangeStatusMembre")
    public String ChangeStatusMembre(HttpSession session, @RequestParam("id") Long id, @RequestParam("type") String type) {
        System.out.println("ddd");
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        admin.changeStaticCompteMembre(id, type);
        return "AdminPages/AdminMembre";
    }

    @RequestMapping("/AdminAjouteMembre")
    public String ajouteMembre(HttpSession session, HttpServletRequest request, @RequestParam(value = "nom", required = false) String nom,
                               @RequestParam(value = "prenom", required = false) String prenom, @RequestParam(value = "email", required = false) String email, @RequestParam(value = "gender", required = false) String gender,
                               @RequestParam(value = "DatedeNai", required = false) String datedeNai, @RequestParam(value = "telNumbre", required = false) String telNumbre,
                               @RequestParam(value = "typeUser", required = false) String type, @RequestParam(value = "photo", required = false) MultipartFile photo) {

        if (!testSession(session))
            return "login";
        String realPath = session.getServletContext().getRealPath("/");

        Admin admin = (Admin) session.getAttribute("user");
        if (type.equals("Medecin")) {
        }
        String speciality = request.getParameter("Sepciality");
        admin.ajoutMembre(nom, prenom, email, gender
                , datedeNai, telNumbre, type, photo, speciality, realPath, null);

        return "redirect:/AdminMembrePage";
    }

    @RequestMapping("/AjouteChembres")
    public String AjouteChembres(@RequestParam("Numerochembre") String[] numero, @RequestParam("service") String[] service, HttpSession session) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        admin.AjouteChembres(numero, service);
        return "redirect:/AdminServicePage";
    }

    @RequestMapping("/AjouteService")
    public String ajouteService(HttpSession session, @RequestParam("service") String service, HttpServletRequest request) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        long idService = admin.AjouteService(service);
        if (idService != 0) {
            Long idChefService = Long.valueOf(request.getParameter("chefService"));
            if ((idChefService == null) || (idChefService.equals("0")) || (idChefService.equals(""))) {
                String realPath = session.getServletContext().getRealPath("/");
                String nom = request.getParameter("nom");
                String prenom = request.getParameter("prenom");
                String email = request.getParameter("email");
                String numeroTel = request.getParameter("telNumbre");
                String dateNaissance = request.getParameter("DatedeNai");
                String gender = request.getParameter("gender");
                MultipartFile photo = (MultipartFile) request.getAttribute("photo");
                admin.ajoutMembre(nom, prenom, email, gender
                        , dateNaissance, numeroTel, "ChefService", photo, null, realPath, String.valueOf(idService));
            } else {
                admin.AfficteChefService(idService
                        , idChefService);
            }
            String[] chembres = request.getParameterValues("chmebre");
            if (chembres.length != 0)
                admin.AfficteChembre(idService, chembres);

        }
        return "redirect:/AdminServicePage";
    }
    //ajex fonction

    @RequestMapping(value = "/chefserviceNotAficte")
    public @ResponseBody
    List<ChefService> chefserviceNotAficte(HttpSession session) {
        if (!testSession(session)) {
            return null;
        } else {
            DataPath.realPath = session.getServletContext().getRealPath("/");
            Admin admin = (Admin) session.getAttribute("user");
            return admin.chefserviceNotAficte();
        }
    }

    @RequestMapping("/personeMedical")
    public @ResponseBody
    ArrayList<Utilisateur> getPersoneMediacal(@RequestParam("type") String type, HttpSession session) {
        if (!testSession(session))
            return null;
        Admin admin = (Admin) session.getAttribute("user");

        return admin.getPersoneMedical(type);
    }

    @RequestMapping("/ChembreLibre")
    @ResponseBody
    public List<String> chembreLibre(HttpSession session) {
        if (!testSession(session))
            return null;
        Admin admin = (Admin) session.getAttribute("user");
        return admin.ChembreLibre();
    }


    @RequestMapping("/listChembre")
    @ResponseBody
    public ArrayList<Chembre> getListChembre(HttpSession session) {
        if (!testSession(session))
            return null;
        Admin admin = new Admin();
        return admin.ListChembre();
    }

    @RequestMapping(value = "/searchMembre", params = {"id"})
    @ResponseBody
    public ArrayList<Utilisateur> recherchePatientByTd(@RequestParam("id") String id, HttpSession session) {

        if (!testSession(session))
            return null;
        Utilisateur user = (Utilisateur) session.getAttribute("user");
        ArrayList<Utilisateur> utilisateur = new ArrayList<>();
        utilisateur.add(new RechercherMembre().RechercheMembreById(id));
        return utilisateur;
    }

    @RequestMapping(value = "/searchMembre", params = {"nom", "prenom"})
    @ResponseBody
    public ArrayList<Utilisateur> rechercheMembre(@RequestParam("nom") String nom, @RequestParam("prenom") String prenom, HttpSession session) {
        if (!testSession(session))
            return null;
        Utilisateur user = (Utilisateur) session.getAttribute("user");
        return new RechercherMembre().RechercheMembreByNomPrenom(nom, prenom);
    }

    private boolean testSession(HttpSession session) {
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || (!utilisateur.getType().equals("Admin")))
            return false;
        else
            return true;
    }

    @RequestMapping(value = "/Affictechembre", method = POST)
    @ResponseBody
    public void Affictechembre(@RequestParam("idService") Long service, @RequestParam("numero") String numero, HttpSession session) {
        if (testSession(session)) {
            Admin user = (Admin) session.getAttribute("user");
            String[] chembre = {numero};
            user.AfficteChembre(service, chembre);
        }
    }
    @RequestMapping(value = "/suppremeChembre", method = POST)
    @ResponseBody
    public void suppremeChembre( @RequestParam("numero") String numero, HttpSession session) {
        if (testSession(session)) {
            Admin user = (Admin) session.getAttribute("user");
            String[] chembre = {numero};
            user.suppremeChembre(numero);
        }
    }

    @RequestMapping(value = "/AfficteChefService", method = POST)
    @ResponseBody
    public String AfficteChefService(@RequestParam("idService") Long service, @RequestParam("chefService") Long numero, HttpSession session) {
        if (testSession(session)) {
            Admin user = (Admin) session.getAttribute("user");
            user.AfficteChefService(service, numero);
            return "ok";
        }else
            return "no";
    }
    @RequestMapping(value = "/updateService", method =POST)
    @ResponseBody
    public void updateService(@RequestParam(value = "idService",required=false) Long service, @RequestParam(value ="nom",required=false) String nom, HttpSession session) {
        if (testSession(session)) {
            System.out.println(service);
            Admin user = (Admin) session.getAttribute("user");
            user.updateService("nom",nom,service);
        }
    }
    @RequestMapping(value = "/deleteService", method = POST)
    @ResponseBody
    public void deleteService(@RequestParam("idService") Long service,HttpSession session) {
        if (testSession(session)) {
            Admin user = (Admin) session.getAttribute("user");
            user.updateService("isdelet", "true", service);
        }
    }
    @RequestMapping(value = "/UpdateMembre" ,method = POST)
    @ResponseBody
    public void UpdateCompte(@RequestParam("filed")String field,@RequestParam("id")long id,@RequestParam("value")String value ,HttpSession session){
        Utilisateur utilisateur= (Utilisateur) session.getAttribute("user");
        if (testSession(session)) {
            Admin user = (Admin) session.getAttribute("user");
            user.updateMembre(field, value, id);
        }
    }


    @RequestMapping(value = "/detailService")
    @ResponseBody
    public Service detailService(@RequestParam("idService") Long service,HttpSession session) {
        if (testSession(session)) {
            Admin user = (Admin) session.getAttribute("user");
         return user.loadService(service);
        }
        return null;
    }
}