package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@EnableAsync
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

    public void londService() {
        String sql = "select * from service s,Medecin cs where cs.id_service=s.id_service and cs.id_Medecin=" + getId();
        this.setService((new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            Service service = null;
            if (rs.next()) {
                this.setSpeiciality(rs.getString("speiciality"));
                service = (new DataExractor()).serviceExrator(rs);
            }
            return service;
        }));
    }

    @Async
    public Future<ArrayList<Raport>> raportOFEtat(Long id_Etar) {
        String SQL = "select * from raport r,utilisateur u where r.id_medecin=u.id_utilisateur and id_etat=" + id_Etar;
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            ArrayList<Raport> raports = new ArrayList<>();
            while (rs.next()) {
                Raport raport = new Raport();
                raport.setType(rs.getString("type"));
                raport.setContenu(rs.getString("contenu"));
                raport.setMedecin((Medecin) (new DataExractor()).utilisateurExratorIdNom(rs, false));
                raports.add(raport);
            }
            return new AsyncResult<>(raports);
        });
    }

    public Etat detailEtat(Long idetat) {
        Etat etat = new Etat();
        try {
            etat.setRaports(raportOFEtat(idetat).get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        String SQL = "select temperaterur,pulsation,tension from etat where id_etat=" + etat.getId();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            if (rs.next()) {
                etat.setPulsation(rs.getFloat("pulsation"));
                etat.setTempeture(rs.getFloat("temperaterur"));
                etat.setTonsion(rs.getFloat("tension"));
            }
            return etat;
        });
    }

    public ArrayList<Etat> etatHistorique(Long idDossier) {
        String SQL = String.format("select id_etat,date,temp from etat where id_dessier=%d", idDossier);
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            ArrayList<Etat> etats = new ArrayList<>();
            while (rs.next()) {
                Etat etat = new Etat();
                etat.setId(rs.getLong("id_etat"));
                etat.setDate(rs.getDate("date"));
                etat.setTime(rs.getTime("temp"));
                etats.add(etat);
            }
            return etats;
        });
    }
    @Async
    public Future<Long> ajouteEtat(String date, String temp, String temperaterur, String pulsation, String tension, Long idDossier) {
        String sql = "insert into etat value (temperaterur,pulsation,tension,date,temp,id_dessier) values (?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        (new ConnectionBD()).getJdbcTemplate().update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, temperaterur);
            ps.setString(2, pulsation);
            ps.setString(3, tension);
            ps.setString(4, date);
            ps.setString(5, temp);
            ps.setLong(6, idDossier);
             return ps;
        }, keyHolder);
        return new AsyncResult<>(Objects.requireNonNull(keyHolder.getKey()).longValue());
    }
    @Async
    public void ajouteRapports(String[]type,String[] contenu,Long idEtat){
        String sql="insert into raport (type,contenu,id_etat,id_medecin) values (?,?,?,?)";
        long idMedcine=this.getId();
        (new ConnectionBD()).getJdbcTemplate().update(sql,
        new BatchPreparedStatementSetter() {
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ps.setString(1,type[i] );
                ps.setString(2, contenu[i]);
                ps.setLong(3, idEtat);
                ps.setLong(4, idMedcine);
            }

            public int getBatchSize() {
                return type.length;
            }

        });
    }
}
