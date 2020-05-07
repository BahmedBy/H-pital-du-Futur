package moudel;

import java.util.Date;

public class patient extends Utilisateur {
    private String etat;
    private long id_chembre;

    public patient(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, String etat) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.etat = etat;
    }

    public patient(long id, String nom, String prenom, String etat) {
        super(id, nom, prenom);
        this.etat = etat;
    }

    public patient(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, String etat, long id_chembre) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.etat = etat;
        this.id_chembre = id_chembre;
    }

    public patient(long id, String nom, String prenom, String etat, long id_chembre) {
        super(id, nom, prenom);
        this.etat = etat;
        this.id_chembre = id_chembre;
    }

    public patient() {
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public long getId_chembre() {
        return id_chembre;
    }

    public void setId_chembre(long id_chembre) {
        this.id_chembre = id_chembre;
    }
}
