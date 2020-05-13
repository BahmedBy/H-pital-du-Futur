package moudel;

import java.util.Date;

public class Infermiere extends Utilisateur {
    private Service service;

    public Infermiere(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, Service service) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.service = service;
    }

    public Infermiere(long id, String nom, String prenom, Service service) {
        super(id, nom, prenom);
        this.service = service;
    }

    public Infermiere() {
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }
}
