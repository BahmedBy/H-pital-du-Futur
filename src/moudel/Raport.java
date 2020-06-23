package moudel;

import java.sql.Date;
import java.sql.Time;

public class Raport {
    private String type;
    private String reporet;
    private Date date;
    private Time time;
    private Etat etat;
    private Medecin medecin;

    public Raport() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReporet() {
        return reporet;
    }

    public void setReporet(String reporet) {
        this.reporet = reporet;
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

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public Medecin getMedecin() {
        return medecin;
    }

    public void setMedecin(Medecin medecin) {
        this.medecin = medecin;
    }
}
