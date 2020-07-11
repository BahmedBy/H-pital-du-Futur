package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@EnableAsync
public class Medecin extends Utilisateur {

    private String speiciality;
    Service service;

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Medecin(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, String speiciality) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.speiciality = speiciality;
    }

    public Medecin(long id, String nom, String prenom, String speiciality) {
        super(id, nom, prenom);
    }

    public Medecin() {
    }


    public String getSpeiciality() {
        return speiciality;
    }

    public void setSpeiciality(String speiciality) {
        this.speiciality = speiciality;
    }
    public void londService() {
        String sql = "select * from service s,Medecin cs where cs.id_service=s.id_service and cs.id_Medecin=" + getId();
        this.setService((new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            Service service = null;
            if (rs.next()){
                this.setSpeiciality(rs.getString("speiciality"));
                service = (new DataExractor()).serviceExrator(rs);}
            return service;
        }));
    }
   @Async
    public Future<ArrayList<Raport>>raportOFEtat(Long id_Etar){
        String SQL="select * from raport r,utilisateur u where r.id_medecin=u.id_utilisateur and id_etat="+id_Etar;
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs->{
            ArrayList<Raport>raports=new ArrayList<>();
            while(rs.next()){
                Raport raport=new Raport();
                raport.setType(rs.getString("type"));
                raport.setContenu(rs.getString("contenu"));
                raport.setMedecin((Medecin) (new DataExractor()).utilisateurExratorIdNom(rs,false ));
                raports.add(raport);
            }
            return new AsyncResult<>(raports);
        });
    }
    public Etat detailEtat(Long idetat){
        Etat etat=new Etat();
        try {
            etat.setRaports(raportOFEtat(idetat).get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        String SQL="select temperaterur,pulsation,tension from etat where id_etat="+etat.getId();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs->{
            if(rs.next()){
                etat.setPulsation(rs.getFloat("pulsation"));
                etat.setTempeture(rs.getFloat("temperaterur"));
                etat.setTonsion(rs.getFloat("tension"));
                       }
            return etat;
        });
    }
    public ArrayList<Etat> etatHistorique(Long idDossier){
        String SQL=String.format("select id_etat,date,temp from etat where id_dessier=%d",idDossier);
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs->{
            ArrayList<Etat>etats=new ArrayList<>();
            while (rs.next()){
                Etat etat=new Etat();
                etat.setId(rs.getLong("id_etat"));
                etat.setDate(rs.getDate("date"));
                etat.setTime(rs.getTime("temp"));
                etats.add(etat);
            }
            return etats;
        });
    }
}
