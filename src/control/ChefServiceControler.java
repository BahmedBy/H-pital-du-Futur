package control;

import BaseDeDonneConfig.DataPath;
import moudel.ChefService;
import moudel.Infermiere;
import moudel.Medecin;
import moudel.Utilisateur;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
public class ChefServiceControler {
    //pagereturn
    @RequestMapping("/ChefServiceHomePage")
    public String ChefserviceHomrPage(HttpSession session, Model model){
        if(!testSession(session))
            return "index";
        ChefService chefService= (ChefService) session.getAttribute("user");
        chefService.londService();
        if (chefService.getService()!=null)
            model.addAttribute("stat", chefService.statistique());
        return "/ChefServicePages/chefserviceHome";
    }
    @RequestMapping("/ChefServiceMembrePage")
    public String MembrePage(HttpSession session,Model model){
        if(!testSession(session))
            return "index";
        DataPath.realPath=session.getServletContext().getRealPath("/");
        ChefService chefService= (ChefService) session.getAttribute("user");
        if (chefService.getService()!=null){
         model.addAttribute("Medecin", chefService.getMedecin(false));
         model.addAttribute("Infermiere", chefService.getInfermiere(false));
        }
        return "ChefServicePages/chefServiceMembre";
    }
    @RequestMapping("/ChefServiceDossieraMedicalPage")
    public String DossieraMedicalPage(HttpSession session){
        if(!testSession(session))
            return "index";
        ChefService chefService= (ChefService) session.getAttribute("user");
        if (chefService.getService()!=null){

        }
        return "ChefServicePages/chefServiceDossier";
    }
    @RequestMapping("/ChefServicePatientPage")
    public String PatientPag(HttpSession session,Model model){
        if(!testSession(session))
            return "index";
        ChefService chefService= (ChefService) session.getAttribute("user");
        if (chefService.getService()!=null){
           model.addAttribute("patient",chefService.getListPatientHospitalise());
        }
        return "ChefServicePages/chefServicePartient";
    }
    //operation

    private boolean testSession(HttpSession session) {
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || (!utilisateur.getType().equals("ChefService")))
            return false;
        else
            return true;
    }
    @RequestMapping("/AjouteMembre")
    public String AjouteMembre(@RequestParam("Medecin")String id_Medecin ,@RequestParam("Infermiere")String Infermiere
    ,HttpSession session){
        if(!testSession(session))
            return "login";
        ChefService chefService= (ChefService) session.getAttribute("user");
        if (chefService.getService()!=null){

        }
        return "redirect:/ChefServiceMembrePage";
    }
    //ajex
    @RequestMapping("/ChefService/InfermiereLibre")
    @ResponseBody
    public ArrayList<Infermiere> getInfermiereLibre(HttpSession session){
   if(!testSession(session))
            return null;
        ChefService chefService= (ChefService) session.getAttribute("user");
        if (chefService.getService()!=null){
            return chefService.getInfermiere(true);
        }
            else
            return null;
    }

    @RequestMapping("/ChefService/MedecinLibre")
    @ResponseBody
    public ArrayList<Medecin> getMedecinLibre(HttpSession session){
   if(!testSession(session))
            return null;
        ChefService chefService= (ChefService) session.getAttribute("user");
        if (chefService.getService()!=null){
            return chefService.getMedecin(true);
        }
            else
            return null;
    }
}
