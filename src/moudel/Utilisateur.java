package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.test.context.jdbc.Sql;

import java.sql.Date;
import java.util.ArrayList;

import java.util.List;
@EnableAsync
public class Utilisateur {
    private long id;
    private String nom;
    private String prenom;
    private String passWord;
    private String email;
    private String numeroTel;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dateNaissance;
    private boolean active;
    private String type;
    private String gender;
    private String photo;

    public Utilisateur(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type,String  gender) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.passWord = passWord;
        this.email = email;
        this.numeroTel = numeroTel;
        this.dateNaissance = dateNaissance;
        this.type = type;
        this.gender=gender;

    }

    public Utilisateur(long id, String nom, String prenom) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
    }

    public Utilisateur() {

}

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumeroTel() {
        return numeroTel;
    }

    public void setNumeroTel(String numeroTel) {
        this.numeroTel = numeroTel;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
    public List<Utilisateur> login(String email, String password) {

        String SQL = String.format("select * from utilisateur where email='%s' and password='%s' and active=true", email, password);
    
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    List<Utilisateur> list = new ArrayList<Utilisateur>();
                    while (rs.next()) {
                        Utilisateur utilisateur = (new DataExractor()).utilisateurExrator(rs,false);
                        list.add(utilisateur);
                    }
                    return list;
                });
    }
    public void update (String filed ,String value ,Long id){
        if ((filed.equals("type"))&&(!value.equals("Patient"))){
            String sql="select type from utilisateur where id_utilisateur="+id;
            String type=(new ConnectionBD()).getJdbcTemplate().query(sql, rs->{
                if (rs.next())
               return rs.getString("type");
                return null;
            });
            if (type!=null)
            {   sql="update "+ type +" set is_service=null where id_"+type+"="+id;
            (new ConnectionBD()).getJdbcTemplate().update(sql);

        }
             sql="insert "+ value +" (id"+value+") values("+id+")";
            (new ConnectionBD()).getJdbcTemplate().update(sql);}
        String Sql="update utilisateur set "+filed+"='"+value+"' where id_utilisateur="+id;
        (new ConnectionBD()).getJdbcTemplate().update(Sql);

    }
    public void update (Utilisateur utilisateur){


        String Sql="update utilisateur set nom=? , prenom=?  , password=?  , numeroTel=?  , dateNaissance=?  , gender=?  where id_utilisateur=?";
        (new ConnectionBD()).getJdbcTemplate().update(Sql,ps -> {
               ps.setString(1, utilisateur.getNom());
               ps.setString(2, utilisateur.getPrenom());
               ps.setString(3, utilisateur.getPassWord());
               ps.setString(4, utilisateur.getNumeroTel());
               ps.setDate(5, utilisateur.getDateNaissance());
               ps.setString(6, utilisateur.getGender());
               ps.setLong(7, utilisateur.getId());
        });

    }
    public Utilisateur loadUtilisateur(long id){

        String SQL ="select * from utilisateur where id_utilisateur="+id;
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    Utilisateur list = new Utilisateur();
                    while (rs.next()) {
                         list = (new DataExractor()).utilisateurExrator(rs,false);

                    }
                    return list;
                });
    }
    @Async
    public void deleteUtilisateur(long id,String type){
        if(type.equals("Medecin"))
            (new Rendez_vous()).supprimerRendezVousMedecin(id);
        String Sql="delete from utilisateur where id_utilisateur="+id;
        (new ConnectionBD()).getJdbcTemplate().update(Sql);
    }
}
