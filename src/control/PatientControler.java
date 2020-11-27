package control;

import moudel.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Date;
import java.util.ArrayList;

import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@Controller
public class PatientControler {
    @RequestMapping("/PatientHomePage")
    public String PatientHomePage(HttpSession session) {
        if (!testSession(session))
            return "login";

        Patient patient = (Patient) session.getAttribute("user");
        patient.loadDossierMedical();
        return "PatientPages/HomePagePatient";
    }

    @RequestMapping("/PatientRendezVous")
    public String PatientRendezVous(HttpSession session, Model model) {
        if (!testSession(session))
            return "login";
        Patient patient = (Patient) session.getAttribute("user");
        model.addAttribute("rendezVous", patient.listRendezVous());
        return "PatientPages/RendezVousPatient";
    }

    @RequestMapping("/patientLastordonnoce")
    public String patientLastordonnoce(HttpSession session, Model model) {
        if (!testSession(session))
            return "login";
        Patient patient = (Patient) session.getAttribute("user");
        model.addAttribute("ordonnonce", patient.lastOrdonnoce());
        return "PatientPages/OrdonnancePatient";

    }

    //android app
    @RequestMapping("app/patient/GetAppointment")
    @ResponseBody
    public ArrayList<Rendez_vous> PatientRendezVous(HttpSession session) {
        if (!testSession(session))
            return null;
        Patient patient = (Patient) session.getAttribute("user");

        return patient.listRendezVous();
    }

    @RequestMapping(value = "app/patient/GetLastOrdonnance ")
    public Raport patientLastordonnoce(HttpSession session) {
        if (!testSession(session))
            return null;
        Patient patient = (Patient) session.getAttribute("user");

        return patient.lastOrdonnoce();

    }

    @RequestMapping(value = "/app/patient/updatePatient", method = PUT)
    public String CancelAppointment(@RequestParam(value = "nom", required = false) String nom, @RequestParam(value = "id", required = false) long id,
                                    @RequestParam(value = "prenom", required = false) String prenom, @RequestParam(value = "password", required = false) String password, @RequestParam(value = "email", required = false) String email, @RequestParam(value = "gender", required = false) String gender,
                                    @RequestParam(value = "dateNaissance", required = false) Date datedeNai, @RequestParam(value = "numeroTel", required = false) String numeroTel,
                                    @RequestParam(value = "typeUser", required = false) String type, HttpSession session, HttpServletRequest request) {
        if (!testSession(session))
            return null;
        Patient patient1 = (Patient) session.getAttribute("user");
        Patient patient=new Patient(id, nom,prenom , password,email ,numeroTel ,datedeNai ,type,gender );
        if (patient.getId()==patient1.getId())
        patient1.update(patient);
        request.setAttribute("id", patient.getId());
        return "redirect:/app/patient/GetPatient";

    }    @RequestMapping(value = "/app/patient/GetPatient")
    @ResponseBody
    public Patient GetPatient(@RequestParam("id") Long id, HttpSession session) {
        if (!testSession(session))
            return null;
        Patient patient = (Patient) session.getAttribute("user");
        boolean b = patient.deletRendezVous(id);
        Utilisateur utilisateur=(new Utilisateur()).loadUtilisateur(id);
        if (utilisateur instanceof Patient)
            return (Patient) utilisateur;
        else
            return null;

    }    @RequestMapping(value = "/app/patient/CancelAppointment", method = PUT)
    @ResponseBody
    public String CancelAppointment(@RequestParam("id") Long id, HttpSession session) {
        if (!testSession(session))
            return null;
        Patient patient = (Patient) session.getAttribute("user");
        boolean b = patient.deletRendezVous(id);
        if (b)
            return "message:sucess";
        else
            return "message:field";

    }

    private Boolean testSession(HttpSession session) {
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || (!utilisateur.getType().equals("Patinet")))

            return true;
        else
            return false;
    }
}
