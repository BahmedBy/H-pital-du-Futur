package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;

import java.net.PortUnreachableException;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Date;
import java.util.ArrayList;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
@EnableAsync
public class Infermiere extends Utilisateur {
    private Service service;

    public Infermiere(long id, String nom, String prenom, String passWord, String email,String gender, String numeroTel, Date dateNaissance, String type, Service service) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type,gender);
        this.service = service;
    }

    public Infermiere(long id, String nom, String prenom, Service service) {
        super(id, nom, prenom);
        this.service = service;
    }

    public Infermiere() {
    }

    public void update(String filed ,String value ,Long id){
    if (filed.equals("id_service")){
        String Sql="update infermiere set "+filed+"="+value+" where id_Infermiere="+id;
        (new ConnectionBD()).getJdbcTemplate().update(Sql);
    }
    else
        super.update(filed, value,id );
    }
    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
    public void londService() {
        String sql = "select * from service s,Infermiere cs where cs.id_service=s.id_service and cs.id_Infermiere=" + getId();
        this.setService((new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            Service service = null;
            if (rs.next()) {
                service = (new DataExractor()).serviceExrator(rs);
            }
            return service;
        }));
    }
    public Utilisateur loadUtilisateur(long id){
        Infermiere u= (Infermiere) super.loadUtilisateur(id);
        u.londService();
        return u;
    }
    @Async
    public ArrayList<Rendez_vous> listRenderVous(String date){
        return (new Rendez_vous()).listRenderVousInfernere(date,this.getService().getId());
    }

    @Async
    public ArrayList<Medecin> MedecinService(){
        String SQl="select * from medecin m where  m.id_service="+this.getService().getId();
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
            ArrayList<Medecin> medecinse=new ArrayList<>();
            while (rs.next()) {

                try {
                 medecinse.add((new Medecin()).loadMedcine(rs.getInt("id_medecin")).get());
                } catch (InterruptedException e) {


                } catch (ExecutionException e) {
                    e.printStackTrace();
                }

            }
            return medecinse;
        }));
    }

    @Async
    public void ajouteRendezVous(String date,String Time ,Long id_MEdecin,Long id_Patient){
        String sql = "insert INTO rendez_vous (date,houre,id_patient,id_medecin) select ?,?,?,?" +
                " from  dual  where not exists (select * from rendez_vous where date = ? and id_medecin=? and id_patient=?)";

        (new ConnectionBD()).getJdbcTemplate().update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, date);
            ps.setString(2, Time);
            ps.setLong(3,id_Patient);
            ps.setLong(4, id_MEdecin);
            ps.setString(5, date);
            ps.setLong(6, id_MEdecin);
            ps.setLong(7, id_Patient);

            System.out.println(ps.toString());
            return ps;
        });

    }

    @Async
    public  void  deletRendezVous(long id){
        (new Rendez_vous()).deletRendezVous(id);
    }

    public ArrayList<String>tempLibre(long id_medecin,String date,long id_Patient){
      return (new Rendez_vous()).tempLibre(id_medecin, date, id_Patient);
}
 @Async
    public void updateRendezVous(long id,String date,String temp){
     (new Rendez_vous()).updateREndezVous(id,date ,temp );
 }

}

