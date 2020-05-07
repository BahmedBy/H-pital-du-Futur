package moudel;

import java.util.Date;

public class Infermiere extends Utilisateur {
    private long id_service;

    public Infermiere(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, long id_service) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        this.id_service = id_service;
    }

    public Infermiere(long id, String nom, String prenom, long id_service) {
        super(id, nom, prenom);
        this.id_service = id_service;
    }

    public Infermiere() {
    }

    public long getId_service() {
        return id_service;
    }

    public void setId_service(long id_service) {
        this.id_service = id_service;
    }
}
