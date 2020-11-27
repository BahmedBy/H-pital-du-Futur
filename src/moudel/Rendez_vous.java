package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.test.context.jdbc.Sql;

import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@EnableAsync
public class Rendez_vous {
    private long id;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    @JsonFormat(pattern="HH:mm")
    private Date time;
    private Medecin medecin;
    private Patient patient;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Medecin getMedecin() {
        return medecin;
    }

    public void setMedecin(Medecin medecin) {
        this.medecin = medecin;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    public ArrayList<String> tempLibre(long id_medecin, String date, long id_Patient){
        ArrayList<String> tempTraviler=tempTraviler();
        String SQl="select houre from rendez_vous where id_medecin="+id_medecin+" and date='"+date+"' UNION select houre from rendez_vous where id_patient="+id_Patient+" and date='"+date+"'";
        System.out.println(SQl);
        ArrayList<String>temp= ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
            ArrayList<String> tempO=new ArrayList<>();
            while (rs.next()) {

                Time time=Time.valueOf(rs.getString("houre"));
                DateFormat format = new SimpleDateFormat("HH:mm");
                String t=format.format(time);
                System.out.println(t);
                tempO.add(t);

            }
            return tempO;
        }));
        System.out.println("temp size="+temp.size());
        tempTraviler.removeAll(temp);
        System.out.println("temp size="+tempTraviler.size());
        return tempTraviler;
    }


    public void supprimerRendezVousMedecin(long id) {

        String Sql="select id_rendez_vous from rendez_vous where id_medecin="+id;
        (new ConnectionBD()).getJdbcTemplate().query(Sql, rs->{
            while (rs.next())
          deletRendezVous(rs.getInt("id_rendez_vous"));
        });
    }

    public ArrayList<Rendez_vous> PatientRendezVous(Long idPatient){
        java.util.Date date = new java.util.Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        String SQl="select * from rendez_vous r ,medecin m where r.id_medecin=m.id_medecin and r.date>="+formatter.format(date)+" and r.id_patient="+idPatient;
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
            ArrayList<Rendez_vous> rendez_vous=new ArrayList<>();
            while (rs.next()) {
                Rendez_vous rendez_vous1=new Rendez_vous();
                rendez_vous1= (new DataExractor()).Rendez_vousExrator(rs);
                try {
                    rendez_vous1.setMedecin((new Medecin()).loadMedcine(rs.getInt("id_medecin")).get());
                } catch (InterruptedException e) {


                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
                rendez_vous.add(rendez_vous1);
            }
            return rendez_vous;
        }));
    }

    public void updateREndezVous(long id,String date,String temp){
        String sql="update rendez_vous set date=? ,houre=? where id_rendez_vous=?";
        (new ConnectionBD()).getJdbcTemplate().update(sql,ps->{
            ps.setString(1, date);
            ps.setString(2, temp);
            ps.setLong(3, id);

        });
    }
    public  boolean  deletRendezVous(long id){
        String sql="delete from rendez_vous where id_rendez_vous="+id;
        int i=(new ConnectionBD()).getJdbcTemplate().update(sql);
        if (i==0)
            return false;
        else
            return true;
    }
    @Async
    ArrayList<String> tempTraviler(){
        ArrayList<String>Temp=new ArrayList<>();
        for (int h=8;h<=14;h++)
            for (int m=0;m<60;m=m+15){
                String hour;
                if (h<10)
                    hour="0"+h;
                else
                    hour=""+h;
                String t;
                if (m==0)
                    t=hour+":"+"00";
                else
                 t=hour+":"+m;
                Temp.add(t);
            }return Temp;

    }

    @Async
    public Future<Patient>loadPatient(long id_Patient){
        String SQl="select * from utilisateur u ,Patient m where u.id_utilisateur=m.id and m.id="+id_Patient;
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {

            Patient patient=new Patient();
            if (rs.next()) {
                patient= (Patient) (new DataExractor()).pationExratorNomId(rs);
            }
            return new AsyncResult<>(patient);
        }));
    }
    public ArrayList<Rendez_vous> listRenderVousInfernere(String date,Long idService){
        String SQl="select * from rendez_vous r ,medecin m where r.id_medecin=m.id_medecin and r.date='"+date+"' and m.id_service="+idService;
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
            ArrayList<Rendez_vous> rendez_vous=new ArrayList<>();
            while (rs.next()) {
                Rendez_vous rendez_vous1=new Rendez_vous();
                rendez_vous1= (new DataExractor()).Rendez_vousExrator(rs);
                try {
                    rendez_vous1.setMedecin((new Medecin()).loadMedcine(rs.getInt("id_medecin")).get());
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
}

