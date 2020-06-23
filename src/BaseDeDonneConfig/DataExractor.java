package BaseDeDonneConfig;

import moudel.*;

import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DataExractor extends DataPath {

    public Utilisateur utilisateurExrator(ResultSet rs) throws SQLException {
        Utilisateur utilisateur = null;

        String pathuploadFile = realPath + "uploadFile" + File.separator;
        String path = "/uploadFile/";
        String type1 = rs.getString("type");
        switch (type1) {
            case "Admin":
                utilisateur = new Admin();
                break;
            case "ChefService":
                utilisateur = new ChefService();
                break;
            case "Medecin":
                utilisateur = new Medecin();
                break;
            case "Infermiere":
                utilisateur = new Infermiere();
                break;
            case "Patient":
                utilisateur = new Patient();
                break;
        }
        utilisateur.setId(rs.getInt("id_utilisateur"));
        utilisateur.setNom(rs.getString("nom"));
        utilisateur.setPrenom(rs.getString("prenom"));
        utilisateur.setEmail(rs.getString("email"));
        utilisateur.setType(type1);
        utilisateur.setDateNaissance(rs.getDate("dateNaissance"));
        utilisateur.setNumeroTel(rs.getString("numeroTel"));
        utilisateur.setGender(rs.getString("gender"));
        String photo = rs.getString("photo");
        if (type1.equals("Medecin"))
            ((Medecin)utilisateur).setSpeiciality(rs.getString("speiciality"));
        if ((photo == null) || (!(new File(pathuploadFile + utilisateur.getId() + utilisateur.getNom() + photo).exists())))
            utilisateur.setPhoto(path + utilisateur.getGender() + ".png");
        else
            utilisateur.setPhoto(path + utilisateur.getId() + utilisateur.getNom() + photo);


        return utilisateur;
    }

    public Service serviceExrator(ResultSet rs) throws SQLException {
        Service service = new Service();
        service.setId(rs.getInt("id_service"));
        service.setNom(rs.getString("nom"));
        return service;
    }

    public Chembre chembreExractor(ResultSet rs) throws SQLException {
        Chembre chembre = new Chembre();
        chembre.setNumero(rs.getString("numero"));
        chembre.setPlein(rs.getBoolean("plein"));
             return chembre;
    }

    public Utilisateur utilisateurExratorIdNom(ResultSet rs)throws SQLException{
        Utilisateur utilisateur = null;
        String pathuploadFile = realPath + "uploadFile" + File.separator;
        String path = "/uploadFile/";
        String type1 = rs.getString("type");
        switch (type1) {
            case "Admin":
                utilisateur = new Admin();
                break;
            case "ChefService":
                utilisateur = new ChefService();
                break;
            case "Medecin":
                utilisateur = new Medecin();
                break;
            case "Infermiere":
                utilisateur = new Infermiere();
                break;
            case "Patient":
                utilisateur = new Patient();
                break;
        }
        utilisateur.setId(rs.getInt("id_utilisateur"));
        utilisateur.setNom(rs.getString("nom"));
        utilisateur.setPrenom(rs.getString("prenom"));
        utilisateur.setGender(rs.getString("gender"));
        String photo = rs.getString("photo");
        if (type1.equals("Medecin"))
            ((Medecin)utilisateur).setSpeiciality(rs.getString("speiciality"));
        if ((photo == null) || (!(new File(pathuploadFile + utilisateur.getId() + utilisateur.getNom() + photo).exists())))
            utilisateur.setPhoto(path + utilisateur.getGender() + ".png");
        else
            utilisateur.setPhoto(path + utilisateur.getId() + utilisateur.getNom() + photo);

        return utilisateur;
    }
}
