package control;


import moudel.Admin;
import moudel.Utilisateur;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class AdminControler {
    @RequestMapping("/AdminHomePage")
    public String homePage(HttpSession session, Model model){
        if (!testSession(session))
            return "login";

        Admin admin= (Admin) session.getAttribute("user");
        model.addAttribute("stat", admin.statistique());
            return "AdminPages/AdminHomePage";

    }
    @RequestMapping("/AdminServicePage")
    public String servicepag(Model model,HttpSession session){
        if (!testSession(session))
            return "login";
        Admin admin= (Admin) session.getAttribute("user");
        model.addAttribute("services", admin.getListService());
        model.addAttribute("k", "k");
        return "AdminPages/AdminService";
    }
    public boolean testSession(HttpSession session){
        Utilisateur utilisateur= (Utilisateur) session.getAttribute("user");
        if((utilisateur==null)||(!utilisateur.getType().equals("Admin")))
            return false;
        else
            return true;
    }
}
