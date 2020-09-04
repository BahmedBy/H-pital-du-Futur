package control;

import moudel.Infermiere;
import moudel.Medecin;
import moudel.Rendez_vous;
import moudel.Utilisateur;
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
public class InfermiereControl {
    //page
@RequestMapping("/InfermiereHomePage")
    public String homePage(HttpSession session){
    if (!testSession(session))
        return "login";
    Infermiere infermiere = (Infermiere) session.getAttribute("user");
    if(infermiere.getService()==null)
    infermiere.londService();
    return "/InfermierePages/InfermiereHome";
}
@RequestMapping("/RedezVousInfermierePage")
    public String RedezVousInfermierePage(HttpSession session, Model model){
    if (!testSession(session))
        return "login";
    Infermiere infermiere = (Infermiere) session.getAttribute("user");
    Date date = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    model.addAttribute("rendezVous", infermiere.listRenderVous(formatter.format(date)));
    model.addAttribute("date", formatter.format(date  ));
    return "/InfermierePages/RendezvousInfermiere";
}

@RequestMapping("/ReserverRendezVous")
    public
    String reserverRendVous(HttpSession session,@RequestParam("date")String date,@RequestParam("idMedcin")long id_Medecin,
                            @RequestParam("idPatient")long id_Patient,@RequestParam("hour")String hour){
        if (!testSession(session))
            return "login";
        Infermiere infermiere = (Infermiere) session.getAttribute("user");
        if (infermiere.getService()==null)
            infermiere.ajouteRendezVous(date, hour, id_Medecin, id_Patient);
        return "InfermierePages/InfermiereHome";


    }
//ajex

    @RequestMapping("/medecinofService")
    public @ResponseBody
    ArrayList<Medecin>medecinofService(HttpSession session){
        if (!testSession(session))
            return null;
        Infermiere infermiere = (Infermiere) session.getAttribute("user");
        if (infermiere.getService()==null)
            return null;
            else
        return infermiere.MedecinService();
    }
    @RequestMapping("/Templibre")
    public @ResponseBody
    ArrayList<String>Templibre(HttpSession session,@RequestParam("date")String date,@RequestParam("idMedcin")long id_Medecin,
                               @RequestParam("idPatient")long id_Patient){
        if (!testSession(session))
            return null;
        Infermiere infermiere = (Infermiere) session.getAttribute("user");
        if (infermiere.getService()==null)
            return null;
        else
            return infermiere.tempLibre(id_Medecin, date,id_Patient);
    }
    @RequestMapping("/Rendez-vousofdate")
    public @ResponseBody
    ArrayList<Rendez_vous>Rendezvousofdate(HttpSession session, @RequestParam("date")String date){
        if (!testSession(session))
            return null;
        Infermiere infermiere = (Infermiere) session.getAttribute("user");
        if (infermiere.getService()==null)
            return null;
        else
            return infermiere.listRenderVous(date);
    }
    private boolean testSession(HttpSession session) {
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || (!utilisateur.getType().equals("Infermiere")))
            return false;
        else
            return true;
    }
}
