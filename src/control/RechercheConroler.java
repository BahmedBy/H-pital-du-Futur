package control;


import BaseDeDonneConfig.DataPath;
import BaseDeDonneConfig.RecherchePatient;
import BaseDeDonneConfig.RechercherMembre;
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
    @RequestMapping(value = "/searchPatient" ,params={"id"})
    @ResponseBody
    public ArrayList<Patient>recherchePatientByTd(@RequestParam("id")String id, HttpSession session){
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
}
