package control;

import moudel.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

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
    @RequestMapping("/RedezVousMedecinPage")
    public String RedezVousInfermierePage(HttpSession session, Model model){
        if (!testSession(session))
            return "login";
        Medecin medecin = (Medecin) session.getAttribute("user");
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        model.addAttribute("rendezVous", medecin.listRenderVous(formatter.format(date)));
        model.addAttribute("date", formatter.format(date  ));
        return "/MedecinPages/MedecinHome";
    }
}
