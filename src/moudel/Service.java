package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.ArrayList;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@EnableAsync
public class Service {
    private long id;
    private String nom;
    private ArrayList<Chembre> chembres;
    private ChefService chefService;

    public ChefService getChefService() {
        return chefService;
    }

    public void setChefService(ChefService chefService) {
        this.chefService = chefService;
    }

    public Service() {
        this.chembres = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public ArrayList<Chembre> getChembres() {
        return chembres;
    }

    public void setChembres(ArrayList<Chembre> chembres) {
        this.chembres = chembres;
    }

    public Service loadService(Long idService){
            String sql = "select *from service where id_service="+ idService;
      Service service=  (new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
           Service service1=null;
            if (rs.next())
                service1=(new DataExractor()).serviceExrator(rs);
          return service1;
      });
      try {
          service.setChefService(loadChefService(idService).get());
          service.setChembres(loadChembre(idService).get());
      } catch (InterruptedException e) {
          e.printStackTrace();
      } catch (ExecutionException e) {
          e.printStackTrace();
      }
      return service;
    }

    @Async
    public Future<ArrayList<Chembre>> loadChembre(Long service){
        String sql = "select * from chembre where id_service="+ service;
        return new AsyncResult<>((new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            ArrayList<Chembre> chembres = new ArrayList<>();
            while (rs.next()) {
                Chembre chembre = (new DataExractor()).chembreExractor(rs);
                chembres.add(chembre);
            }
            return chembres;
        }));
    }
    @Async
    public Future<ChefService>loadChefService(Long service){
        String sql = "select * from ChefService cs ,utilisateur u where cs.id_chefService=u.id_utilisateur and id_service="+ service;
        return new AsyncResult<>((new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
             ChefService chefService=null;
            while (rs.next()) {
               chefService= (ChefService) (new DataExractor()).utilisateurExratorIdNom(rs, true);
            }
            return chefService;
        }));
    }
    @Async
    public void updateService(String filedUpdate ,String Valeue ,Long idService){
        String sql = String.format("update service set  %s='%s' where id_service=%d",filedUpdate,Valeue, idService);
        (new ConnectionBD()).getJdbcTemplate().update(sql);
    }
    public ArrayList<Service> listhopitelService(){
        String SQL = "select * from service where isdelet=false";
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Service> list = new ArrayList<>();
                    while (rs.next()) {
                        Service service = (new DataExractor()).serviceExrator(rs);
                        list.add(service);
                    }
                    return list;
                });
    }
}
