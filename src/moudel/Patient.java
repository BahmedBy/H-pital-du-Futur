package moudel;

import java.util.Date;

public class Patient extends Utilisateur {
    private String etat;
    private Chembre chembre;
    private DossierMedical dossierMedica;

    public DossierMedical getDossierMedica() {
        return dossierMedica;
    }

    public void setDossierMedica(DossierMedical dossierMedica) {
        this.dossierMedica = dossierMedica;
    }

    public Patient(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, String etat) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.etat = etat;
    }

    public Patient(long id, String nom, String prenom, String etat) {
        super(id, nom, prenom);
        this.etat = etat;
    }

    public Patient(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, String etat, Chembre chembre) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.etat = etat;
        this.chembre = chembre;
    }

    public Patient(long id, String nom, String prenom, String etat, Chembre chembre) {
        super(id, nom, prenom);
        this.etat = etat;
        this.chembre = chembre;
    }

    public Patient() {
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Chembre getChembre() {
        return chembre;
    }

    public void setChembre(Chembre chembre) {
        this.chembre = chembre;
    }
}
