package control;

import moudel.Chembre;
import moudel.Service;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

@Controller
public class ControllerEtatPatinet {

    @RequestMapping("/controler/ListServicesHopetal")
    public @ResponseBody
    ArrayList<Service> listHopitelService() {
        System.out.println("ok");
        return (new Service()).listhopitelService();
    }
    @RequestMapping("/controler/ListServicesChembre")
    public @ResponseBody
    ArrayList<Chembre> ListServicesChembre(@RequestParam("idServcie")Long idServcie) throws ExecutionException, InterruptedException {
        ArrayList<Chembre> chembres = (new Service()).loadChembre(idServcie).get();
        return chembres;
    }
    @MessageMapping("/hello")
    @SendTo("/topic/messages")
    public String greeting(String message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return message;
    }
}
