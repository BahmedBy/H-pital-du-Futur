package moudel;

import BaseDeDonneConfig.ConnectionBD;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;

import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
@EnableAsync
public class Rendez_vous {
    private long id;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    @JsonFormat(pattern="HH-mm-ss")
    private Time time;
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

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
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
        String SQl="select houre from rendez_vous where id_medecin="+id_medecin+" and date="+date+" UNION select houre from rendez_vous where id_pateint="+id_Patient+" and date="+date;
        ArrayList<String>temp= ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
            ArrayList<String> tempO=new ArrayList<>();
            while (rs.next()) {

                Time time=rs.getTime("hour");
                DateFormat format = new SimpleDateFormat("HH:mm");
                String t=format.format(time);
                tempO.add(t);

            }
            return tempO;
        }));
        temp.removeAll(tempTraviler);
        return temp;
    }

    @Async
    ArrayList<String> tempTraviler(){
        ArrayList<String>Temp=new ArrayList<>();
        for (int h=8;h<=14;h++)
            for (int m=0;h<=60;m=m+15){
                String t=h+":"+m;
                Temp.add(t);
            }return Temp;

    }
}
