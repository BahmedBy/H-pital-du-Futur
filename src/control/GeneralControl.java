package control;

import BaseDeDonneConfig.DataPath;
import BaseDeDonneConfig.RecherchePatient;
import BaseDeDonneConfig.RechercherMembre;
import moudel.Patient;
import moudel.Utilisateur;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class GeneralControl {
    //    @RequestMapping("")
//    public String index(Model model){
//        System.out.println("casear bta");
//       /// System.out.println(model.getAttribute("email"));
//        return "index.jsp";
//
    @RequestMapping("/login")
    public String login(Model model, @RequestParam("email") String email, @RequestParam("password") String password, HttpSession session) {
        DataPath.realPath=session.getServletContext().getRealPath("/");
        List<Utilisateur> comptes = (new Utilisateur()).login(email, password);
        if (comptes.size() == 0){
            model.addAttribute("messageError", "Email ou password est incrrocet");
            return "login";}
        else {
            session.setAttribute("user", comptes.get(0));
            return "redirect:/" + comptes.get(0).getType() + "HomePage";
        }

    }

    @RequestMapping("/loginpage")
    public String loginpage() {
        return "login";
    }

    @RequestMapping("/")
    public String Accueil(HttpServletRequest request) {

        return "index";

    }
  @RequestMapping("/logout")
    public String logOut(HttpSession session){
        session.invalidate();
        return "index";
  }
  @RequestMapping("/CompteInformation")
    public String CompteInformation(HttpSession session){
        Utilisateur utilisateur= (Utilisateur) session.getAttribute("user");
        if(utilisateur==null)
            return "login";
        else
            return utilisateur.getType()+"Pages/Compte"+utilisateur.getType();
  }
   @RequestMapping(value = "/UpdateCompte",method = POST)
   @ResponseBody
   public String UpdateCompte(@RequestParam("filed")String field,@RequestParam("value")String value ,HttpSession session){
       Utilisateur utilisateur= (Utilisateur) session.getAttribute("user");
       System.out.println(utilisateur!=null);
         if(utilisateur!=null){
           utilisateur.update(field,value ,utilisateur.getId() );
           session.setAttribute("user", utilisateur.loadUtilisateur(utilisateur.getId()));
             return "message:yes";
   }else
       return "message:no";
    }
    @RequestMapping(value = "/searchPatient" ,params={"id"})
    @ResponseBody
    public ArrayList<Patient> recherchePatientByTd(@RequestParam("id")String id, HttpSession session){
        System.out.println(testSessionPatient(session));
        if(!testSessionPatient(session))
            return null;
        Utilisateur user= (Utilisateur) session.getAttribute("user");
        ArrayList<Patient> patients=new ArrayList<>();
        patients.add(new RecherchePatient().RecherchePatientById(id, user.getType()));
        return patients;
    }
    @RequestMapping(value = "/searchPatient" ,params={"nom","prenom"})
    @ResponseBody
    public ArrayList<Patient> recherchePatient(@RequestParam("nom")String nom, @RequestParam("prenom")String prenom, HttpSession session){
        if(!testSessionPatient(session))
            return null;
        Utilisateur user= (Utilisateur) session.getAttribute("user");
        return new RecherchePatient().RecherchePatientByNomPrenom(nom, prenom, user.getType());
    }
    @RequestMapping(value = "/allPatientInformation" )
    @ResponseBody
    public Patient patientInformation(@RequestParam("id")String id, HttpSession session){
        if(!testSessionPatient(session))
            return null;

        Utilisateur user= (Utilisateur) session.getAttribute("user");

        return new RecherchePatient().PatientDetail(id,user.getType() );
    }
    @RequestMapping(value = "/allMembreInformation" )
    @ResponseBody
    public Utilisateur membreInformation(@RequestParam("id")String id, @RequestParam("type")String type,HttpSession session){
        if(!testSessionMembre(session))
            return null;

        Utilisateur user= (Utilisateur) session.getAttribute("user");

        return new RechercherMembre().MembreDetail(id, type);
    }

    private boolean testSessionPatient(HttpSession session){
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || ((!utilisateur.getType().equals("ChefService"))&&(!utilisateur.getType().equals("Medecin"))&&(!utilisateur.getType().equals("Infermiere"))))
            return false;
        else
            return true;
    }
    private boolean testSessionMembre(HttpSession session){
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || ((!utilisateur.getType().equals("ChefService"))&&(!utilisateur.getType().equals("Admin"))))
            return false;
        else
            return true;
    }
    @RequestMapping (value = "/app/login",method = GET)
    @ResponseBody
    public Patient loginapp(HttpSession session,@RequestParam("email") String email, @RequestParam("password") String password){
        DataPath.realPath=session.getServletContext().getRealPath("/");
        Utilisateur utilisateur= (Utilisateur) (new Utilisateur()).login(email, password);
        if (utilisateur instanceof Patient){
            Patient patient=(Patient) utilisateur;
            patient.loadDossierMedical();
            return patient;}
        else
            return null;
    }
}