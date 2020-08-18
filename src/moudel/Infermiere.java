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
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
@EnableAsync
public class Infermiere extends Utilisateur {
    private Service service;

    public Infermiere(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, Service service) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.service = service;
    }

    public Infermiere(long id, String nom, String prenom, Service service) {
        super(id, nom, prenom);
        this.service = service;
    }

    public Infermiere() {
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
    @Async
    public ArrayList<Rendez_vous> listRenderVous(String date){
        String SQl="select * from rendez_vous r ,medecin m where r.id_medecin=m.id_medecin and r.date="+date+" and m.id_service="+this.getService().getId();
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
                    ArrayList<Rendez_vous> rendez_vous=new ArrayList<>();
                    while (rs.next()) {
                        Rendez_vous rendez_vous1=new Rendez_vous();
                        rendez_vous1= (new DataExractor()).Rendez_vousExrator(rs);
                        try {
                            rendez_vous1.setMedecin(loadMedcine(rs.getInt("id_medecin")).get());
                            rendez_vous1.setPatient(loadPatient(rs.getInt("id_patient")).get());
                        } catch (InterruptedException e) {


                        } catch (ExecutionException e) {
                            e.printStackTrace();
                        }
                        rendez_vous.add(rendez_vous1);
                    }
                    return rendez_vous;
                }));
    }
    @Async
    public Future<Medecin>loadMedcine(long id_Medecin){
        String SQl="select * from utilisateur u r ,medecin m where u.id_utilisateur=m.id_medecin and m.id_medecin="+id_Medecin;
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {

            Medecin medecin=new Medecin();
            if (rs.next()) {
                medecin= (Medecin) (new DataExractor()).utilisateurExratorIdNom(rs, true);
            }
            return new AsyncResult<>(medecin);
        }));
    }
    @Async
    public Future<Patient>loadPatient(long id_Medecin){
        String SQl="select * from utilisateur u r ,Patient m where u.id_utilisateur=m.id and m.id="+id_Medecin;
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {

            Patient patient=new Patient();
            if (rs.next()) {
                patient= (Patient) (new DataExractor()).pationExratorNomId(rs);
            }
            return new AsyncResult<>(patient);
        }));
    }
    @Async
    public ArrayList<Medecin> MedecinService(){
        String SQl="select * from medecin m where  m.id_service="+this.getService().getId();
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
            ArrayList<Medecin> medecinse=new ArrayList<>();
            while (rs.next()) {

                try {
                 medecinse.add(loadMedcine(rs.getInt("id_medecin")).get());
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
        String sql="delete from rendez_vous where id_rendez_vous="+id;
        (new ConnectionBD()).getJdbcTemplate().update(sql);
    }

    public ArrayList<String>tempLibre(long id_medecin,String date,long id_Patient){
      return (new Rendez_vous()).tempLibre(id_medecin, date, id_Patient);
}


}

