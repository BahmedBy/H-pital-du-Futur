package moudel;

import java.util.Date;

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
}
