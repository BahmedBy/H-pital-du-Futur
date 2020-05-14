package control;

import moudel.ChefService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
public class ChefServiceControler {
    @RequestMapping("ChefserviceHomrPage")
    public String ChefserviceHomrPage(HttpSession session, Model model){
        ChefService chefService= (ChefService) session.getAttribute("user");
        return "";
    }
}
