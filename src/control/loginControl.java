package control;

import BaseDeDonneConfig.DataPath;
import moudel.Utilisateur;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class loginControl {
    //    @RequestMapping("")
//    public String index(Model model){
//        System.out.println("casear bta");
//       /// System.out.println(model.getAttribute("email"));
//        return "index.jsp";
//
    @RequestMapping("/login")
    public String login(@RequestParam("email") String email, @RequestParam("password") String password, HttpSession session) {
        DataPath.realPath=session.getServletContext().getRealPath("/");
        List<Utilisateur> comptes = (new Utilisateur()).login(email, password);
        if (comptes.size() == 0)
            return "login";
        else if (comptes.size() == 1) {
            session.setAttribute("user", comptes.get(0));
            return "redirect:/" + comptes.get(0).getType() + "HomePage";
        } else return "";

    }

    @RequestMapping("/loginpage")
    public String loginpage() {
        return "login";
    }

    @RequestMapping("/")
    public String Accueil(HttpServletRequest request) {

        return "index";

    }
  @RequestMapping("/logout")
    public String logOut(HttpSession session){
        session.invalidate();
        return "index";
  }
  @RequestMapping("/CompteInformation")
    public String CompteInformation(HttpSession session){
        Utilisateur utilisateur= (Utilisateur) session.getAttribute("user");
        if(utilisateur==null)
            return "login";
        else
            return utilisateur.getType()+"Pages/Compte"+utilisateur.getType();
  }
   @RequestMapping(value = "/UpdateCompte",method = POST)
   @ResponseBody
   public String UpdateCompte(@RequestParam("filed")String field,@RequestParam("value")String value ,HttpSession session){
       Utilisateur utilisateur= (Utilisateur) session.getAttribute("user");
       System.out.println(utilisateur!=null);
         if(utilisateur!=null){
           utilisateur.update(field,value ,utilisateur.getId() );
           session.setAttribute("user", utilisateur.loadUtilisateur(utilisateur.getId()));
             return "message:yes";
   }else
       return "message:no";
    }

}