package control;


import BaseDeDonneConfig.RecherchePatient;
import moudel.Patient;
import moudel.Utilisateur;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
public class RechercheConroler {
    @RequestMapping(value = "//ChefService/searchPatient" ,params="id")
    @ResponseBody
    public Patient recherchePatientByTd(@RequestParam("id")String id, HttpSession session){
        if(!testSession(session))
            return null;
        Utilisateur user= (Utilisateur) session.getAttribute("user");
        return new RecherchePatient().RecherchePatientById(id, user.getType());
    }
    @RequestMapping(value = "//ChefService/searchPatient" ,params="{nom,prenom}")
    @ResponseBody
    public ArrayList<Patient> recherchePatient(@RequestParam("nom")String nom, @RequestParam("prenom")String prenom, HttpSession session){
        if(!testSession(session))
            return null;
        Utilisateur user= (Utilisateur) session.getAttribute("user");
        return new RecherchePatient().RecherchePatientByNomPrenom(nom, prenom, user.getType());
    }
    private boolean testSession(HttpSession session){
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || ((!utilisateur.getType().equals("ChefService"))&&(!utilisateur.getType().equals("Medecin"))&&(!utilisateur.getType().equals("Infermiere"))))
            return false;
        else
            return true;
    }
}
