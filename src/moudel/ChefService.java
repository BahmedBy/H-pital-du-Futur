package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
import java.util.concurrent.Future;

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
    public ArrayList<Infermiere> listInfermiere(Boolean libre) {
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
                        Infermiere utilisateur = (Infermiere) (new DataExractor()).utilisateurExratorIdNom(rs, true);
                        list.add(utilisateur);
                    }
                    return list;
                });
    }

    @Async
    public ArrayList<Medecin> listMedecin(boolean libre) {
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
                        Medecin medecin = (Medecin) (new DataExractor()).utilisateurExratorIdNom(rs, true);
                        list.add(medecin);
                    }
                    return list;
                });
    }

    @Async
    public void AjouteMembre(Long[] id_Medecin, Long[] id_Infermiere) {
        Long idService = this.getService().getId();
        if (id_Medecin != null)
            (new ConnectionBD()).getJdbcTemplate().batchUpdate(
                    "update Medecin set id_service=? where id_Medecin=?",
                    new BatchPreparedStatementSetter() {
                        public void setValues(PreparedStatement ps, int i) throws SQLException {
                            ps.setLong(1, idService);
                            ps.setLong(2, id_Medecin[i]);
                        }

                        public int getBatchSize() {
                            return id_Medecin.length;
                        }

                    });

        if (id_Infermiere != null)
            (new ConnectionBD()).getJdbcTemplate().batchUpdate(
                    "update Infermiere set id_service=? where id_Infermiere=?",
                    new BatchPreparedStatementSetter() {
                        public void setValues(PreparedStatement ps, int i) throws SQLException {
                            ps.setLong(1, idService);
                            ps.setLong(2, id_Infermiere[i]);
                        }

                        public int getBatchSize() {
                            return id_Infermiere.length;
                        }

                    });
    }

    public ArrayList<Patient> ListPatientHospitalise() {
        String SQL = "select * from chembre c,patient p,utilisateur u where c.id_service=" + this.getService().getId() + " and c.plein=true and c.id_patient=p.id and p.id=u.id_utilisateur";
        DataExractor dataExractor = new DataExractor();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Patient> list = new ArrayList<>();
                    while (rs.next()) {
                        Patient patient = dataExractor.pationExratorNomId(rs);
                        patient.setChembre(dataExractor.chembreExractor(rs));
                        list.add(patient);
                    }
                    return list;
                });
    }

    public ArrayList<String> chembreLibre() {
        String SQL = "select numero from chembre where plein=false and id_service=" + this.getService().getId();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            ArrayList<String> numeros = new ArrayList<>();
            while (rs.next())
                numeros.add(rs.getString("numero"));
            return numeros;

        });
    }

    @Async
    public Future<Long> ajoutPatient(String nom, String prenom, String email, String gender, String datedeNai,
                                     String telNumbre, MultipartFile photo, String realPath) {
        String extension;
        if (photo != null)
            extension = "." + FilenameUtils.getExtension(photo.getOriginalFilename());
        else
            extension = null;
        String sql = "insert INTO utilisateur (nom,prenom,email,password,numeroTel,dateNaissance,type,photo,gender,active) select ?,?,?,?,?,?,?,?,?,?" +
                " from  dual  where not exists (select * from utilisateur where nom = ? and prenom = ? and dateNaissance = ? and type =?)";
        String defualPassword = null;
        if (email != null)
            defualPassword = datedeNai.replace("-", "");
        KeyHolder keyHolder = new GeneratedKeyHolder();

        String finalDefualPassword = defualPassword;
        (new ConnectionBD()).getJdbcTemplate().update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, nom);
            ps.setString(2, prenom);
            if (email != null) {
                ps.setString(3, email);
                ps.setString(4, finalDefualPassword);
                ps.setBoolean(14, true);
            } else {
                ps.setString(3, null);
                ps.setString(4, null);
                ps.setBoolean(14, false);
            }
            ps.setString(5, telNumbre);
            ps.setString(6, datedeNai);
            ps.setString(7, "Patient");
            ps.setString(8, extension);
            ps.setString(9, gender);
            ps.setString(10, nom);
            ps.setString(11, prenom);
            ps.setString(12, datedeNai);
            ps.setString(13, "Patient");

            return ps;
        }, keyHolder);
        if (keyHolder.getKey() != null) {
            long id = Objects.requireNonNull(keyHolder.getKey()).longValue();
            if (id != 0) {
                String sql2 = "insert into patient (id) value (" + id + ")";
                (new ConnectionBD()).getJdbcTemplate().update(sql2);
            }
            if (id != 0) {
                if (photo != null) {
                    File outFile = new File(realPath + "uploadFile" + File.separator + id + nom + extension);
                    try {
                        photo.transferTo(outFile);
                        outFile.createNewFile();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            return new AsyncResult<Long>(id);
        } else
            return new AsyncResult<Long>((long) 0);
    }

    @Async
    public Future<Long> createDosserMedical(Long id, String gropage) {
        String SQl = "insert into dossiermedical(groupage,Id_patient) value (?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        (new ConnectionBD()).getJdbcTemplate().update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(SQl, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, gropage);
            ps.setLong(2, id);

            return ps;
        }, keyHolder);
        if (keyHolder != null) {
            long Id = Objects.requireNonNull(keyHolder.getKey()).longValue();
            return new AsyncResult<Long>(Id);
        } else return new AsyncResult<Long>((long) 0);
    }

    @Async
    public void admisPatient(String date, String hour, String remarque, long idDossier, long id_patient, String numeroChembre) {
        String SQl = "insert into entree(date,heur,Remarque,id_dossierMedical,id_service) value (?,?,?,?,?)";
        (new ConnectionBD()).getJdbcTemplate().update(
                connection -> {
                    PreparedStatement ps = connection.prepareStatement(SQl);
                    ps.setString(1, date);
                    ps.setString(2, hour);
                    ps.setString(3, remarque);
                    ps.setLong(4, idDossier);
                    ps.setLong(5, this.service.getId());
                    return ps;
                });
        String SQL = "update chembre set plein=true,id_patient=? where numero=?";
        (new ConnectionBD()).getJdbcTemplate().update(
                connection -> {
                    PreparedStatement ps = connection.prepareStatement(SQL);
                    ps.setLong(1, id_patient);
                    ps.setString(2, numeroChembre);
                    return ps;
                });
        String sql = "update patient set hospitalise=true where id=?";
        (new ConnectionBD()).getJdbcTemplate().update(
                connection -> {
                    PreparedStatement ps = connection.prepareStatement(sql);
                    ps.setLong(1, id_patient);
                    return ps;
                });
    }

    @Async
    public void sortirPatient(String date, String hour, String remarque, long idDossier, long id_patient, String type) {
        String SQl = "insert into sortie(date,heur,Remarque,type,id_dossierMedical,id_service) value (?,?,?,?,?,?)";
        (new ConnectionBD()).getJdbcTemplate().update(
                connection -> {
                    PreparedStatement ps = connection.prepareStatement(SQl);
                    ps.setString(1, date);
                    ps.setString(2, hour);
                    ps.setString(3, remarque);
                    ps.setString(4, type);
                    ps.setLong(4, idDossier);
                    ps.setLong(5, this.service.getId());
                    return ps;
                });
        String SQL = "update chembre set plein=false where id_patient=?=?";
        (new ConnectionBD()).getJdbcTemplate().update(
                connection -> {
                    PreparedStatement ps = connection.prepareStatement(SQL);
                    ps.setLong(1, id_patient);
                    return ps;
                });
        String sql = "update patient set hospitalise=false where id=?";
        (new ConnectionBD()).getJdbcTemplate().update(
                connection -> {
                    PreparedStatement ps = connection.prepareStatement(sql);
                    ps.setLong(1, id_patient);
                    return ps;
                });
    }

    @Async
    public void supprimePatient(long idDossier, long id_patient,int typeSuppristion) {

        if (typeSuppristion == 0) {
            String SQL = "update dossiermedical set suppreme=true where id_patient=?";
            (new ConnectionBD()).getJdbcTemplate().update(
                    connection -> {
                        PreparedStatement ps = connection.prepareStatement(SQL);
                        ps.setLong(1, id_patient);
                        return ps;
                    });
        } else {
            String SQL = "delete from utilisateur where id_utilisateur=?";
            (new ConnectionBD()).getJdbcTemplate().update(
                    connection -> {
                        PreparedStatement ps = connection.prepareStatement(SQL);
                        ps.setLong(1, id_patient);
                        return ps;
                    });
        }

    }

}
