package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.scheduling.annotation.Async;

import java.util.ArrayList;
import java.sql.Date;

public class Patient extends Utilisateur {
    private Boolean hospitalise;
    private Boolean mort;
    private Chembre chembre;
    private DossierMedical dossierMedical;
    public Boolean getHospitalise() {
        return hospitalise;
    }
    public Patient(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type,String  gender) {
         super(id,nom,prenom,passWord,email,numeroTel,dateNaissance,type,gender);
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

    public Patient(long id, String nom, String prenom, String passWord, String email, String gender,String numeroTel, Date dateNaissance, String type, Boolean hospitalise) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type,gender);
        this.hospitalise = hospitalise;
    }

    public Patient(long id, String nom, String prenom, Boolean hospitalise) {
        super(id, nom, prenom);
        this.hospitalise = hospitalise;
    }

    public Patient(long id, String nom, String prenom, String passWord, String email,String gender, String numeroTel, Date dateNaissance, String type, Boolean hospitalise, Chembre chembre) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type, gender);
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
 public void loadDossierMedical(){
        String sql ="select * from dossiermedical where Id_patient="+this.getId();
        this.setDossierMedica((new ConnectionBD()).getJdbcTemplate().query(sql,rs->{
           DossierMedical dossierMedical=null;
            if (rs.next()){
                dossierMedical=new DossierMedical();
                dossierMedical.setGroupage(rs.getString("groupage"));
                dossierMedical.setId(rs.getLong("id_dossier"));
            }
            return dossierMedical;
        } ));
 }
    @Async
    public void update(String filed ,String value ,Long id){
        if (filed.equals("groupage"))
            (new DossierMedical()).update(filed,value ,id );
        else if (filed.equals("hospitalise")||filed.equals("mort"))
        {
            String Sql="update patient set "+filed+"='"+value+"' where id="+id;
            (new ConnectionBD()).getJdbcTemplate().update(Sql);
        }else
            super.update(filed,value ,id );
    }
    public ArrayList<Rendez_vous>listRendezVous(){
        return(new Rendez_vous()).PatientRendezVous(this.getId());
    }
    public Raport lastOrdonnoce(){
        String sql="select * from raport r,utilisateur u ,etat e where r.id_medecin=u.id_utilisateur and r.type='Ordonnance' and r.id_etat=e.id_etat"+
                " and e.temp=(select max(temp) from raport r, etat e where r.id_etat=e.id_etat and r.type='Ordonnance'  and date=(select max(date) from raport r, etat e where r.id_etat=e.id_etat and r.type='Ordonnance' " +
                " and e.id_dessier="+this.getDossierMedical().getId()+"))";
        return (new ConnectionBD()).getJdbcTemplate().query(sql, rs-> {
            Raport raport = null;
            if (rs.next())
            {       raport.setType(rs.getString("type"));
            raport.setContenu(rs.getString("contenu"));
            raport.setMedecin((Medecin) (new DataExractor()).utilisateurExratorIdNom(rs, false));
            raport.setEtat((new DataExractor()).EtatExractor(rs));
            raport.getMedecin().londService();
        }
        return raport;
        });
    }
    public boolean deletRendezVous(long id){
        return (new Rendez_vous()).deletRendezVous(id);
    }
}
