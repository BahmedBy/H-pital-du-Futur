package moudel;

import java.util.Date;

public class Medcin extends Utilisateur {

    private String speiciality;
    Service service;

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Medcin(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, String speiciality) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.speiciality = speiciality;
    }

    public Medcin(long id, String nom, String prenom, String speiciality) {
        super(id, nom, prenom);
    }

    public Medcin() {
    }


    public String getSpeiciality() {
        return speiciality;
    }

    public void setSpeiciality(String speiciality) {
        this.speiciality = speiciality;
    }
}
