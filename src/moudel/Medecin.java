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
import java.sql.Date;
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

    public Medecin(long id, String nom, String prenom, String passWord, String email,String gender, String numeroTel, Date dateNaissance, String type, String speiciality) {
        super(id, nom, prenom, passWord, email, numeroTel, dateNaissance, type, gender);
        this.speiciality = speiciality;
    }

    public Medecin(long id, String nom, String prenom, String speiciality) {
        super(id, nom, prenom);
    }

    public Medecin() {
    }
    public void update(String filed ,String value ,Long id){
        if ((filed.equals("id_service"))||(filed.equals("speiciality"))){
            String Sql="update Medecin set "+filed+"="+value+" where id_Medecin="+id;
            (new ConnectionBD()).getJdbcTemplate().update(Sql);
        }
        else
            super.update(filed, value,id );
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
    public Utilisateur loadUtilisateur(long id){
        Medecin u= (Medecin) super.loadUtilisateur(id);
        u.londService();
        return u;
    }
    @Async
    public Future<ArrayList<Raport>> raportOFEtat(Long id_Etar) {
        String SQL = "select * from raport r where  id_etat=" + id_Etar;
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            ArrayList<Raport> raports = new ArrayList<>();
            while (rs.next()) {
                Raport raport = new Raport();
                raport.setType(rs.getString("type"));
                raport.setContenu(rs.getString("contenu"));
                try {
                    raport.setMedecin( loadMedcine(rs.getInt("id_medecin")).get());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
                raports.add(raport);
            }
            return new AsyncResult<>(raports);
        });
    }

    public Etat detailEtat(Long idetat) {

        String SQL = "select * from etat where id_etat=" + idetat;
        Etat etat =(new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            Etat etat1=new Etat();
            if (rs.next()) {
                etat1=(new DataExractor()).EtatExractor(rs);
            }
            return etat1;
        });
        try {
            etat.setRaports(raportOFEtat(idetat).get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return etat;
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
    public Future<Long> ajouteEtat(String date, String temp, float temperaterur, float pulsation, float tension, Long idDossier) {
        String sql = "insert into etat  (temperaterur,pulsation,tension,date,temp,id_dessier) values (?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        (new ConnectionBD()).getJdbcTemplate().update(connection -> { PreparedStatement ps = connection
                    .prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setFloat(1, temperaterur);
            ps.setFloat(2, pulsation);
            ps.setFloat(3, tension);
            ps.setString(4, date);
            ps.setString(5, temp);
            ps.setLong(6, idDossier);
            System.out.println(ps);
            return ps;
        }, keyHolder);
        return new AsyncResult<>(Objects.requireNonNull(keyHolder.getKey()).longValue());
    }

    public void ajouteRapports(String[]type,String[] contenu,Long idEtat){
//        String sql="insert into raport (type,contenu,id_etat,id_medecin) values (?,?,?,?)";
        long idMedcine=this.getId();

        (new ConnectionBD()).getJdbcTemplate().batchUpdate("insert into raport (type,contenu,id_etat,id_medecin) values (?,?,?,?)",
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
    public ArrayList<Rendez_vous> listRenderVous(String date){
        String SQl="select * from rendez_vous r ,patient p,utilisateur u where r.id_patient=p.id and u.id_utilisateur=p.id and r.date='"+date+"' and r.id_medecin="+this.getId();
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {
            ArrayList<Rendez_vous> rendez_vous=new ArrayList<>();
            while (rs.next()) {
                Rendez_vous rendez_vous1=new Rendez_vous();
                rendez_vous1= (new DataExractor()).Rendez_vousExrator(rs);
                 rendez_vous1.setPatient((new DataExractor()).pationExratorNomId(rs));
                 rendez_vous.add(rendez_vous1);}
            return rendez_vous;
        }));
    }
    @Async
    public Future<Medecin> loadMedcine(long id_Medecin){
        String SQl="select * from utilisateur u ,medecin m where u.id_utilisateur=m.id_medecin and type='Medecin' and m.id_medecin="+id_Medecin;
        return ((new ConnectionBD()).getJdbcTemplate().query(SQl, rs -> {

            Medecin medecin=new Medecin();
            if (rs.next()) {
                medecin= (Medecin) (new DataExractor()).utilisateurExratorIdNom(rs, true);
                medecin.londService();
            }
            return new AsyncResult<>(medecin);
        }));
    }

    public void ajouteDomande(String type,Long idEtat){
      String sql ="Select id_raport from raport where id_etat="+idEtat+" and type='"+type+"'";
      long idRaport=(new ConnectionBD()).getJdbcTemplate().query(sql,rs->{
        long id=0;
          if (rs.next())
              id=rs.getLong("id_raport");
          return id ;
      } );
      if (idRaport!=0){
          Long sevice=this.getService().getId();
           sql ="insert into domande (id_domande,id_Service) values (?,?)";
        (new ConnectionBD()).getJdbcTemplate().update(sql,ps->{
            ps.setLong(1, idRaport);
            ps.setLong(2, sevice);
        }
    );
      }}
}
