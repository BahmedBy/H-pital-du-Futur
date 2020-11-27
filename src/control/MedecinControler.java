package control;

import moudel.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.http.HttpRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

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
    @RequestMapping("/MedecinsingnalAlarme")

    public String singnalAlarme(Model model, HttpSession session){
        System.out.println("MedecinsingnalAlarme");
        if (!testSession(session))
            return null;
        Medecin medecin = (Medecin) session.getAttribute("user");
        if(medecin.getService()!=null){
            Map map= (Map) session.getAttribute("Patirnt");

            System.out.println(  session.toString());
            long idPatient= (long) map.get(medecin.getService().getId());
           model.addAttribute("idPatient", idPatient);


        //    model.addAttribute("idPatient",map.get(medecin.getService().getId()) );
            return "MedecinPages/MedecinSingnalAlarme";
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
    @RequestMapping(value = "/AjouteEtat",method = POST)
    public String AjouteEtat(HttpSession session, HttpServletRequest request, @RequestParam("idDossier")Long idDossir, @RequestParam("date") String date, @RequestParam("temp")String hour
    , @RequestParam("temperaterur") float temperaterur, @RequestParam("tension") float tension, @RequestParam("pulsation") float pulsation){
        if (!testSession(session))
            return "login";
        Medecin medecin = (Medecin) session.getAttribute("user");

        try {
            long etatId= medecin.ajouteEtat(date, hour, temperaterur, pulsation, tension, idDossir).get();
            String []type=request.getParameterValues("type");
            String []contenu=request.getParameterValues("contenu");
            boolean b=false;
            String domande=null;
            for (String s:type)
                if (s.equals("demandeHospitalisation")||s.equals("demandeSortir")) {
                    b = true;
                    domande=s;
                }
            if (type!=null)
                medecin.ajouteRapports(type, contenu, etatId);
            if (b) {
                    medecin.ajouteDomande(domande, etatId);
                }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
   return "redirect:/MedecinHomePage";
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
        return "/MedecinPages/RendezvousMedecin";
    }

    //ajex
    @RequestMapping("/RedezVousMedecin")
    @ResponseBody
    public ArrayList<Rendez_vous> RedezVousInfermierePage(HttpSession session, @RequestParam("date") String date){
        if (!testSession(session))
            return null;
        Medecin medecin = (Medecin) session.getAttribute("user");
        return  medecin.listRenderVous(date);
    }

@RequestMapping("/EtatInformation")
    @ResponseBody
    public Etat EtatInformation(HttpSession session, @RequestParam("idEtat") Long idEtat){
        if (!testSession(session))
            return null;
        Medecin medecin = (Medecin) session.getAttribute("user");

        return  medecin.detailEtat(idEtat);
    }
}
