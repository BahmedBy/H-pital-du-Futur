package control;

import BaseDeDonneConfig.DataPath;
import moudel.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@Controller
public class ChefServiceControler {
    //pagereturn
    @RequestMapping("/ChefServiceHomePage")
    public String ChefserviceHomrPage(HttpSession session, Model model) {
        if (!testSession(session))
            return "index";
        ChefService chefService = (ChefService) session.getAttribute("user");
        chefService.londService();
        if (chefService.getService() != null)
            model.addAttribute("stat", chefService.statistique());
        return "/ChefServicePages/chefserviceHome";
    }

    @RequestMapping("/ChefServiceMembrePage")
    public String MembrePage(HttpSession session, Model model) {
        if (!testSession(session))
            return "index";
        DataPath.realPath = session.getServletContext().getRealPath("/");
        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            model.addAttribute("Medecin", chefService.listMedecin(false));
            model.addAttribute("Infermiere", chefService.listInfermiere(false));
        }
        return "ChefServicePages/chefServiceMembre";
    }

    @RequestMapping("/ChefServiceDossieraMedicalPage")
    public String DossieraMedicalPage(HttpSession session) {
        if (!testSession(session))
            return "index";
        ChefService chefService = (ChefService) session.getAttribute("user");

        return "ChefServicePages/chefServiceDossier";
    }

    @RequestMapping("/ChefServicePatientPage")
    public String PatientPag(HttpSession session, Model model) {
        if (!testSession(session))
            return "index";
        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            model.addAttribute("patient", chefService.ListPatientHospitalise());
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

    @RequestMapping("/ChefServiceAjouteMembre")
    public String AjouteMembre(@RequestParam(value = "Medecin", required = false) Long[] id_Medecin, @RequestParam(value = "Infermiere", required = false) Long[] id_Infermiere
            , HttpSession session) {
        if (!testSession(session))
            return "login";
        System.out.println(id_Infermiere.length);
        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            chefService.AjouteMembre(id_Medecin, id_Infermiere);
        }
        return "redirect:/ChefServiceMembrePage";
    }

    @RequestMapping("/AdmisPatient")
    public String AdmisPatient(@RequestParam("date") String date, @RequestParam("hour") String hour,
                               @RequestParam("remarque") String remarque, @RequestParam("chembre") String chembre, @RequestParam("idPatient") Long id_Patient
            , @RequestParam("idDossier") Long id_Dossier, HttpSession session) {
        if (!testSession(session))
            return "login";

        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            chefService.admisPatient(date, hour, remarque, id_Dossier, id_Patient, chembre);
        }
        return "redirect:/ChefServicePatientPage";
    }

    @RequestMapping("/SortirPatient")
    public String SortirPatient(@RequestParam("date") String date, @RequestParam("hour") String hour,
                                @RequestParam("remarque") String remarque, @RequestParam("type") String type, @RequestParam("idPatient") Long id_Patient
            , @RequestParam("idDossier") Long id_Dossier, HttpSession session) {
        if (!testSession(session))
            return "login";

        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            chefService.sortirPatient(date, hour, remarque, id_Dossier, id_Patient, type);
        }
        return "redirect:/ChefServicePatientPage";
    }


    @RequestMapping("/suprimeDessierMedical")
    public String AjouteMembre(@RequestParam("idPatient") Long id_Patient, @RequestParam("idDossier") Long id_Dossier
            , @RequestParam("sortir") int sortir, @RequestParam("suprime") int typeSuppristion, @RequestParam(value ="date",required = false) String date, @RequestParam(value ="hour",required = false) String hour,
              @RequestParam(value = "remarque",required = false) String remarque, @RequestParam(value ="type",required = false) String type,
             HttpSession session) {
        if (!testSession(session))
            return "login";

        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
           if(sortir==1)
               chefService.sortirPatient(date, hour, remarque, id_Dossier, id_Patient, type);
           chefService.supprimePatient(id_Dossier, id_Patient, typeSuppristion );

        }
        return "redirect:/ChefServiceDossieraMedicalPage";
    }

    @RequestMapping("/AjoutePatient")
    public String AjoutePatient(HttpSession session, HttpServletRequest request, @RequestParam(value = "Nom", required = false) String nom,
                                @RequestParam(value = "Prenom", required = false) String prenom, @RequestParam(value = "gender", required = false) String gender,
                                @RequestParam(value = "DatedeNai", required = false) String datedeNai, @RequestParam(value = "telNumbre", required = false) String telNumbre,
                                @RequestParam(value = "photo", required = false) MultipartFile photo, @RequestParam(value = "creatCompte", required = false) int creatCompte,
                                @RequestParam(value = "isAdmistoin", required = false) int isAdmistoin, @RequestParam(value = "groupage", required = false) String groupage) {
        if (!testSession(session))
            return "login";
        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            String email = null;
            String realPatch = session.getServletContext().getRealPath("/");
            if (creatCompte != 0)
                email = request.getParameter("email");
            Future<Long> idPatient = chefService.ajoutPatient(nom, prenom, email, gender, datedeNai, telNumbre, photo, realPatch);
            try {
                if (idPatient.get() != 0) {
                    Future<Long> idDossier = chefService.createDosserMedical(idPatient.get(), groupage);
                    if (isAdmistoin != 0) {
                        String date = request.getParameter("date");
                        String hour = request.getParameter("hour");
                        String remarque = request.getParameter("remarque");
                        String chembre = request.getParameter("chembre");
                        chefService.admisPatient(date, hour, remarque, idDossier.get(), idPatient.get(), chembre);
                    }
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        }
        return "redirect:ChefServiceDossieraMedicalPage";
    }

    //ajex
    @RequestMapping("/ChefService/InfermiereLibre")
    @ResponseBody
    public ArrayList<Infermiere> getInfermiereLibre(HttpSession session) {

        if (!testSession(session))
            return null;
        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            return chefService.listInfermiere(true);
        } else
            return null;
    }

    @RequestMapping("/ChefService/MedecinLibre")
    @ResponseBody
    public ArrayList<Medecin> getMedecinLibre(HttpSession session) {

        if (!testSession(session))
            return null;
        ChefService chefService = (ChefService) session.getAttribute("user");
        if (chefService.getService() != null) {
            return chefService.listMedecin(true);
        } else
            return null;
    }

    @RequestMapping("/ChefService/ChembreLibre")
    @ResponseBody
    public ArrayList<String> getChembreLibre(HttpSession session) {
        if (!testSession(session))
            return null;
        ChefService chefService = (ChefService) session.getAttribute("user");
        return chefService.chembreLibre();
    }


}
