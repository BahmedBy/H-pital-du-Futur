package control;

import moudel.Chembre;
import moudel.Patient;
import moudel.Service;
import moudel.Utilisateur;

import org.json.JSONObject;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Controller
public class ControllerEtatPatinet {
    private static Map<Long,Long> ids=new HashMap<>();
    @RequestMapping("/Controler")
    public
    String listHopitelService(Model model) {
        model.addAttribute ("service",(new Service()).listhopitelService());
        return "ControleEtatPatient";
    }
    @RequestMapping("/controler/ListServicesChembre")
    public @ResponseBody
    ArrayList<Chembre> ListServicesChembre(@RequestParam("idServcie")Long idServcie) throws ExecutionException, InterruptedException {
        ArrayList<Chembre> chembres = (new Service()).loadChembre(idServcie).get();
        return chembres;
    }
    @RequestMapping("/controler/ListServicesPatient")
    public @ResponseBody
    Patient PatientChembre(@RequestParam("idChembre")String idChembre) throws ExecutionException, InterruptedException {
        Chembre chembre=new Chembre();
        chembre.setNumero(idChembre);
        chembre.LoadPatient();
        return chembre.getPatient();
    }
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public String greeting(@Payload String message) throws Exception {
        System.out.println(1);
        try{
            JSONObject jsonObject=new JSONObject(message);
            if(jsonObject.get("type").equals("SignalAlarame"))
                ids.put(jsonObject.getLong("servcir"),jsonObject.getLong("idPatient") );
        }catch ( Exception e){
            e.printStackTrace();
        }
        return message;
    }
    @RequestMapping("/singnalAlarme")
    public String singnalAlarme(HttpSession session){
        Utilisateur utilisateur= (Utilisateur) session.getAttribute("user");
        Map map=ids;
        System.out.println(map.size()!=0);
        if (map.size()!=0)
            session.setAttribute("Patirnt",map);
        Map map1= (Map) session.getAttribute("id");

        return "redirect:/"+utilisateur.getType()+"singnalAlarme";
    }
}
