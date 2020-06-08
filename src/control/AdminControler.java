package control;


import BaseDeDonneConfig.DataPath;
import moudel.Admin;
import moudel.Medcin;
import moudel.Utilisateur;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;


@Controller
public class AdminControler {
    @RequestMapping("/AdminHomePage")
    public String homePage(HttpSession session, Model model) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        model.addAttribute("stat", admin.statistique());
        return "AdminPages/AdminHomePage";
    }

    @RequestMapping("/AdminServicePage")
    public String servicepag(Model model, HttpSession session) {
        if (!testSession(session))
            return "login";
        Admin admin = (Admin) session.getAttribute("user");
        model.addAttribute("services", admin.getListService());
        return "AdminPages/AdminService";
    }


    @RequestMapping(value = "/chefserviceNotAficte")
    public @ResponseBody
    List<String> chefserviceNotAficte(HttpSession session) {
        if (!testSession(session)) {
            return null;
        } else {
            Admin admin = (Admin) session.getAttribute("user");
            ArrayList<String> rs = admin.chefserviceNotAficte();
            System.out.println("ra7 ");
            return rs;
        }
    }

    @RequestMapping("/AdminMembre")
    public String membrePage(HttpSession session) {
        if (!testSession(session))
            return "login";
        return "AdminPages/AdminMembre";
    }

    @RequestMapping("/AdminAjouteMembre")
    public String ajouteMembre(HttpSession session, HttpServletRequest request, @RequestParam(value = "nom", required = false) String nom,
                               @RequestParam(value = "prenom", required = false) String prenom, @RequestParam(value = "email", required = false) String email, @RequestParam(value = "gender", required = false) String gender,
                               @RequestParam(value = "DatedeNai", required = false) String datedeNai, @RequestParam(value = "telNumbre", required = false) String telNumbre,
                               @RequestParam(value = "typeUser", required = false) String type, @RequestParam(value = "photo", required = false) MultipartFile photo) {

        if (!testSession(session))
            return "login";
        System.out.println(photo.isEmpty());
        String realPath = session.getServletContext().getRealPath("/");
        String extension = "." + FilenameUtils.getExtension(photo.getOriginalFilename());
        Admin admin = (Admin) session.getAttribute("user");
        if (type.equals("Medcin")) {
        }
        String speciality = request.getParameter("Sepciality");
        long id = admin.ajoutMembre(nom, prenom, email, gender
                , datedeNai, telNumbre, type, extension, speciality);
        if (id != 0) {
            File outFile = new File(realPath + "uploadFile" + File.separator + nom + extension);
            try {
                photo.transferTo(outFile);
                outFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "redirect:/AdminMembre";
    }
@RequestMapping("/personeMedical")
public @ResponseBody Utilisateur getPersoneMediacal(@RequestParam("type")String type,HttpSession session){
//        if(!testSession(session))
//            return null;
        Admin admin = (Admin) session.getAttribute("user");
    Medcin medcin=new Medcin();
    medcin.setSpeiciality("fff");
    return medcin;
}

    private boolean testSession(HttpSession session) {
        Utilisateur utilisateur = (Utilisateur) session.getAttribute("user");
        if ((utilisateur == null) || (!utilisateur.getType().equals("Admin")))
            return false;
        else
            return true;
    }}