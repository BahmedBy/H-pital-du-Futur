package control;

import BaseDeDonneConfig.DataPath;
import moudel.Admin;
import moudel.ChefService;
import moudel.Chembre;
import moudel.Utilisateur;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
        model.addAttribute("services", admin.getListService());
        return "AdminPages/AdminService";
    }

    @RequestMapping("/AdminMembrePage")
    public String membrePage(HttpSession session) {
        if (!testSession(session))
            return "login";
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

        return "redirect:/AdminMembre";
    }

    @RequestMapping("/AjouteChembres")
    public String AjouteChembres(@RequestParam("Numerochembre") String[] numero, @RequestParam("service") String[] service, HttpSession session) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        admin.AjouteChembres(numero, service);
        return "AdminPages/AdminService";
    }

    @RequestMapping("/AjouteService")
    public String ajouteService(HttpSession session, @RequestParam("service") String service, HttpServletRequest request) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        long idService=admin.AjouteService(service);
        if(idService!=0){
        String idChefService = request.getParameter("chefService");
        if ((idChefService == null) || (idChefService.equals("0"))|| (idChefService.equals(""))) {
            String realPath=session.getServletContext().getRealPath("/");
            String nom=request.getParameter("nom");
            String prenom=request.getParameter("prenom");
            String email=request.getParameter("email");
            String numeroTel=request.getParameter("telNumbre");
            String dateNaissance=request.getParameter("DatedeNai");
            String gender=request.getParameter("gender");
            MultipartFile photo= (MultipartFile) request.getAttribute("photo");
            admin.ajoutMembre(nom, prenom, email, gender
                    , dateNaissance, numeroTel,"ChefService", photo, null, realPath, String.valueOf(idService));
        }
        else {
           admin.AfficteChefService(idService
                   , idChefService);
        }
        String [] chembres=request.getParameterValues("chmebre");
        if (chembres.length!=0)
            admin.AfficteChembre(idService,chembres);

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
        return admin.getChembreLibre();
    }


    @RequestMapping("/listChembre")
    @ResponseBody
    public ArrayList<Chembre> getListChembre(HttpSession session) {
//        if(!testSession(session))
//            return null;
        Admin admin = new Admin();
        return admin.getListChembre();
    }

    private boolean testSession(HttpSession session) {
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || (!utilisateur.getType().equals("Admin")))
            return false;
        else
            return true;
    }
}