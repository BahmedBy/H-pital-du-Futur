package control;


import moudel.Admin;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class AdminControler {
    @RequestMapping("/Admin/HomePage")
    public String homePage(HttpSession session, Model model){
        Admin admin= (Admin) session.getAttribute("user");
        model.addAttribute("stat", admin.statistique());
        return "AdminPages/AdminHomePage";

    }
}
