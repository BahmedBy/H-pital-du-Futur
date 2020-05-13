package moudel;

import java.util.Date;

public class ChefService extends Utilisateur{
    private long Id_service;
    private Service service;

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public ChefService(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type, long id_service) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
        Id_service = id_service;
    }

    public ChefService(long id, String nom, String prenom, long id_service) {
        super(id, nom, prenom);
        Id_service = id_service;
    }

    public ChefService() {
    }

    public long getId_service() {
        return Id_service;
    }

    public void setId_service(long id_service) {
        Id_service = id_service;
    }
}
