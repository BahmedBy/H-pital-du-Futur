package moudel;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Array;
import java.sql.Time;
import java.sql.Date;
import java.util.ArrayList;

public class Etat {
    private Long Id;
    private double tempeture;
    private double pulsation;
    private double tonsion;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    @JsonFormat(pattern="HH-mm-ss")
    private Time time;
    private ArrayList<Raport>raports;
    private Patient patient;
    private DossierMedical dossierMedical;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public DossierMedical getDossierMedical() {
        return dossierMedical;
    }

    public void setDossierMedical(DossierMedical dossierMedical) {
        this.dossierMedical = dossierMedical;
    }

    public double getTempeture() {
        return tempeture;
    }

    public void setTempeture(double tempeture) {
        this.tempeture = tempeture;
    }

    public double getPulsation() {
        return pulsation;
    }

    public void setPulsation(double pulsation) {
        this.pulsation = pulsation;
    }

    public double getTonsion() {
        return tonsion;
    }

    public void setTonsion(double tonsion) {
        this.tonsion = tonsion;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ArrayList<Raport> getRaports() {
        return raports;
    }

    public void setRaports(ArrayList<Raport> raports) {
        this.raports = raports;
    }

    public Etat() {
        this.raports=new ArrayList<>();
    }
}
