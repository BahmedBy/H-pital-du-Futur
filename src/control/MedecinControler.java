package control;

import moudel.ChefService;
import moudel.Etat;
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
public class MedecinControler {
    @RequestMapping("/MedecinHomePage")
    public String ChefserviceHomrPage(HttpSession session, Model model) {
        if (!testSession(session))
            return "login";
        Medecin medecin = (Medecin) session.getAttribute("user");
        medecin.londService();
        return "/MedecinPages/MedecinHome";
    }
    @RequestMapping("/MedecinEtatHistorique")
    @ResponseBody
    public ArrayList<Etat>etatHistorique(@RequestParam("idDossier")Long idDossier,HttpSession session){
        if (!testSession(session))
            return null;
        Medecin medecin = (Medecin) session.getAttribute("user");
        if(medecin.getService()!=null){
         return medecin.etatHistorique(idDossier);
        }
        return null;
    }
    @RequestMapping("/etatInfomation")
    @ResponseBody
    public Etat etatInformation(@RequestParam("idEtat")Long id_Etat,HttpSession session){
        if (!testSession(session))
            return null;
        Medecin medecin = (Medecin) session.getAttribute("user");
        if(medecin.getService()!=null){
         return medecin.detailEtat(id_Etat);
        }
        return null;
    }
    private boolean testSession(HttpSession session) {
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || (!utilisateur.getType().equals("Medecin")))
            return false;
        else
            return true;
    }
}
