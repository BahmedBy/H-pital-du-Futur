package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.*;
@EnableAsync
public class Admin extends Utilisateur {
    public Map<?, ?> statistique() {
        ConnectionBD connectionBD = new ConnectionBD();
        Map<String, Integer> stat = new HashMap<>();
        stat.put("NService", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM service", Integer.class));
        stat.put("NMedecin", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur where type ='Medecin' and active ='1'", Integer.class));
        stat.put("NInfermiere", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur where type ='Infermiere' and active ='1'", Integer.class));
        stat.put("NPartient", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur where type ='Partient' and active ='1'", Integer.class));
        return stat;
    }

    public ArrayList<Service> getListService() {
        String SQL = "select * from service";
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Service> list = new ArrayList<>();
                    while (rs.next()) {
                        Service service = (new DataExractor()).serviceExrator(rs);
                        list.add(service);
                    }
                    return list;
                });
    }

    public ArrayList<Utilisateur> getPersoneMedical(String type) {
        String SQL = "select * from " + type + " t,utilisateur u where t.id_" + type + "=u.id_utilisateur and " +
                "active=true";
        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Utilisateur> list = new ArrayList<>();
                    while (rs.next()) {
                        Utilisateur utilisateur = (new DataExractor()).utilisateurExrator(rs);

                        list.add(utilisateur);
                    }
                    return list;
                });
    }

    public ArrayList<ChefService> chefserviceNotAficte() {
        String sql = "select id_utilisateur,nom,prenom,photo,type,gender from utilisateur u ,chefservice cs where u.id_utilisateur=cs.id_chefservice and cs.id_service is null ";
        return (new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            ArrayList<ChefService> chefservices = new ArrayList<>();
            while (rs.next()) {
                ChefService chefService = (ChefService) (new DataExractor()).utilisateurExratorIdNom(rs);
                chefservices.add(chefService);
            }
            return chefservices;
        });
    }

    @Async
    public void ajoutMembre(String nom, String prenom, String email, String gender, String datedeNai,
                            String telNumbre, String type, MultipartFile photo, String spiciality,String realPath,String idService) {
        String defualPassword = datedeNai.replace("-", "");
        String extension = "." + FilenameUtils.getExtension(photo.getOriginalFilename());
        String sql = "insert INTO utilisateur (nom,prenom,email,password,numeroTel,dateNaissance,type,active,photo,gender) select ?,?,?,?,?,?,?,?,?,?" +
                " from  dual  where not exists (select * from utilisateur where email = ? and type =?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        (new ConnectionBD()).getJdbcTemplate().update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, nom);
            ps.setString(2, prenom);
            ps.setString(3, email);
            ps.setString(4, defualPassword);
            if (telNumbre.equals(""))
                ps.setString(5, null);
            else
                ps.setString(5, telNumbre);
            ps.setString(6, datedeNai);
            ps.setString(7, type);
            ps.setBoolean(8, true);
            ps.setString(9, extension);
            ps.setString(10, gender);
            ps.setString(11, email);
            ps.setString(12, type);
            System.out.println(ps.toString());
            return ps;
        }, keyHolder);
        if (keyHolder != null) {
            long id = Objects.requireNonNull(keyHolder.getKey()).longValue();
            if (id != 0) {
                String sql2;
                if (type.equals("Medecin"))
                    sql2 = String.format("insert into %s (id_%s,speiciality,id_service) values(%d,'%s',%d)", type, type, id, spiciality,idService);
                else
                    sql2 = String.format("insert into %s (id_%s) values(%d,%s,%d)", type, type, id,idService);
                (new ConnectionBD()).getJdbcTemplate().update(sql2);

            }
            if (id != 0) {
                File outFile = new File(realPath + "uploadFile" + File.separator + id + nom + extension);
                try {
                    photo.transferTo(outFile);
                    outFile.createNewFile();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public ArrayList<Chembre> getListChembre() {
        String sql = "select *from chembre ";
        return (new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            ArrayList<Chembre> chembres = new ArrayList<>();
            while (rs.next()) {
                Chembre chembre = (new DataExractor()).chembreExractor(rs);
                int idService = rs.getInt("id_service");
                System.out.println(idService);
                if ( idService!= 0)
                    chembre.setService(getServiceById(idService));
                chembres.add(chembre);
            }
            return chembres;
        });
    }

    public List<String> getChembreLibre() {
        String sql = "select numero from chembre where id_service is null";
        return (new ConnectionBD()).getJdbcTemplate().query(sql, resultSet -> {
            ArrayList<String> chembres = new ArrayList<>();
            while (resultSet.next())
                chembres.add(resultSet.getString("numero"));
            return chembres;
        });
    }

    @Async
    public String AjouteChembres(String[] numero, String[] service) {
        (new ConnectionBD()).getJdbcTemplate().batchUpdate(
                "insert into chembre (numero,id_service) values(?,?)",
                new BatchPreparedStatementSetter() {
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setString(1, numero[i]);
                        if (service[i].equals("null"))
                            ps.setString(2, null);
                        else
                            ps.setInt(2, Integer.parseInt(service[i]));
                    }

                    public int getBatchSize() {
                        return numero.length;
                    }

                });
        return "";
    }

    public long AjouteService(String nomService){
        String sql = "insert INTO service (nom) select ?" +
                " from  dual  where not exists (select * from service where nom = ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        (new ConnectionBD()).getJdbcTemplate().update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, nomService);
            ps.setString(2, nomService);

            System.out.println(ps.toString());
            return ps;
        }, keyHolder);
        return  Objects.requireNonNull(keyHolder.getKey()).longValue();
    }

    @Async
    public void AfficteChefService(Long Service,String chefService){
        String sql=String.format("update chefservice set id_service=%d where id_chefService=%s",Service,chefService);
        (new ConnectionBD()).getJdbcTemplate().update(sql);
    }
    @Async
    public void AfficteChembre(Long Service,String[] chembres){
        (new ConnectionBD()).getJdbcTemplate().batchUpdate(
                "update chembre set id_service=? where numero=?",
                new BatchPreparedStatementSetter() {
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, Service);
                        ps.setString(2, chembres[i]);
                    }

                    public int getBatchSize() {
                        return chembres.length;
                    }

                });
    }
    @Async
    public Service getServiceById(long id) {
        String sql = "select *from service where id_service=" + id;
        return (new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            Service service = null;
            while (rs.next())
                service = (new DataExractor()).serviceExrator(rs);
            return service;
        });
    }
}
