package control;


import moudel.Admin;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class AdminControler {
    @RequestMapping("/AdminHomePage")
    public String homePage(HttpSession session, Model model){
        System.out.println("Home in ");
        Admin admin= (Admin) session.getAttribute("user");
        model.addAttribute("stat", admin.statistique());
        System.out.println("Home out ");
        return "AdminPages/AdminHomePage";

    }
}
