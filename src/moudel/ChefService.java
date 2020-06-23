package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@EnableAsync
public class ChefService extends Utilisateur {

    private Service service;

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public ChefService(long id, String nom, String prenom, String passWord, String email, String numeroTel, Date dateNaissance, String type) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type);
    }

    public ChefService(long id, String nom, String prenom) {
        super(id, nom, prenom);
    }

    public ChefService() {
    }

    public void londService() {
        String sql = "select s.id_service,nom from service s,chefservice cs where cs.id_service=s.id_service and cs.id_chefService=" + getId();
        this.setService((new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            Service service = null;
            while (rs.next())
                service = (new DataExractor()).serviceExrator(rs);
            return service;
        }));
    }

    public Map<?, ?> statistique() {
        ConnectionBD connectionBD = new ConnectionBD();
        Map<String, Integer> stat = new HashMap<>();
        stat.put("NMedecin", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur u,Medecin m where type ='Medecin' and active ='1' and u.id_utilisateur=m.id_Medecin and m.id_service=" + this.getService().getId(), Integer.class));
        stat.put("NInfermiere", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur u,infermiere i where type ='Infermiere' and active ='1' and u.id_utilisateur=i.id_infermiere and i.id_service=" + this.getService().getId(), Integer.class));
        stat.put("NPartient", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM chembre where plein ='1' and id_service=" + this.getService().getId(), Integer.class));
        stat.put("NChembre", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM chembre where  id_service=" + this.getService().getId(), Integer.class));
        int i = stat.get("NChembre") - stat.get("NPartient");
        stat.put("NChembreLibre", i);
        return stat;
    }

    @Async
    public ArrayList<Infermiere> getInfermiere(Boolean libre) {
        String SQL = "select id_utilisateur,nom,prenom,photo,type,gender from Infermiere t,utilisateur u where t.id_Infermiere=u.id_utilisateur and " +
                "active=true ";
        if (libre)
            SQL = SQL + "and t.id_service is null ";
        else
            SQL = SQL + "and t.id_service=" + this.getService().getId();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Infermiere> list = new ArrayList<>();
                    while (rs.next()) {
                        Infermiere utilisateur = (Infermiere) (new DataExractor()).utilisateurExratorIdNom(rs);
                        list.add(utilisateur);
                    }
                    return list;
                });
    }

    @Async
    public ArrayList<Medecin> getMedecin(boolean libre) {
        String SQL = "select id_utilisateur,nom,prenom,photo,type,gender,speiciality from Medecin t,utilisateur u where t.id_Medecin=u.id_utilisateur and " +
                "active=true ";
        if (libre)
            SQL = SQL + "and t.id_service is null ";
        else
            SQL = SQL + "and t.id_service=" + this.getService().getId();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Medecin> list = new ArrayList<>();
                    while (rs.next()) {
                        Medecin medecin = (Medecin) (new DataExractor()).utilisateurExratorIdNom(rs);
                        list.add(medecin);
                    }
                    return list;
                });
    }

    @Async
    public void AjouteMembre(String[] id_Medecin, String[] id_Infermiere) {
        String idService = String.valueOf(this.getService().getId());
        (new ConnectionBD()).getJdbcTemplate().batchUpdate(
                "update Medecin set id_service=? where id_Medecin=?",
                new BatchPreparedStatementSetter() {
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setString(1, idService);
                        ps.setString(2, id_Medecin[i]);
                    }

                    public int getBatchSize() {
                        return id_Medecin.length;
                    }

                });
        (new ConnectionBD()).getJdbcTemplate().batchUpdate(
                "update Infermiere set id_service=? where id_Infermiere=?",
                new BatchPreparedStatementSetter() {
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setString(1, idService);
                        ps.setString(2, id_Infermiere[i]);
                    }

                    public int getBatchSize() {
                        return id_Infermiere.length;
                    }

                });
    }
      public ArrayList<Patient>getListPatientHospitalise()
    {
        String SQL ="select * from chembre c,patient p,utilisateur u where c.id_service="+this.getService().getId()+" c.plein=true and c.id_patient=p.id_patient and p.id_patient=u.id_utilisateur";
        DataExractor dataExractor=new DataExractor();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Patient> list = new ArrayList<>();
                    while (rs.next()) {
                        Patient patient = (Patient) dataExractor.utilisateurExratorIdNom(rs);
                        patient.setChembre(dataExractor.chembreExractor(rs));
                        list.add(patient);
                    }
                    return list;
                });
    }
}
