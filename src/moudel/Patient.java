package moudel;

import java.util.Date;

public class Patient extends Utilisateur {
    private Boolean hospitalise;
    private Boolean mort;
    private Chembre chembre;
    private DossierMedical dossierMedical;
    public Boolean getHospitalise() {
        return hospitalise;
    }

    public void setHospitalise(Boolean hospitalise) {
        this.hospitalise = hospitalise;
    }

    public Boolean getMort() {
        return mort;
    }

    public void setMort(Boolean mort) {
        this.mort = mort;
    }

    public DossierMedical getDossierMedical() {
        return dossierMedical;
    }


    public void setDossierMedica(DossierMedical dossierMedical) {
        this.dossierMedical = dossierMedical;
    }

    public Patient(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, Boolean hospitalise) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.hospitalise = hospitalise;
    }

    public Patient(long id, String nom, String prenom, Boolean hospitalise) {
        super(id, nom, prenom);
        this.hospitalise = hospitalise;
    }

    public Patient(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, Boolean hospitalise, Chembre chembre) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.hospitalise = hospitalise;
        this.chembre = chembre;
    }

    public Patient(long id, String nom, String prenom, Boolean hospitalise, Chembre chembre) {
        super(id, nom, prenom);
        this.hospitalise = hospitalise;
        this.chembre = chembre;
    }

    public Patient() {
    }



    public Chembre getChembre() {
        return chembre;
    }

    public void setChembre(Chembre chembre) {
        this.chembre = chembre;
    }
}
