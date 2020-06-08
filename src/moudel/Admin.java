package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.io.File;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Admin extends Utilisateur {
    public Map<?, ?> statistique() {
        ConnectionBD connectionBD = new ConnectionBD();
        Map<String, Integer> stat = new HashMap<>();
        stat.put("NService", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM service", Integer.class));
        stat.put("NMedcin", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur where type ='Medcin' and active ='1'", Integer.class));
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

    public ArrayList<ChefService> getListChefService(ConnectionBD connectionBD) {
        String SQL = "select * from chefservice cs,utilisateur u,service where cs.id_chefService=u.id_utilisateur " +
                "and active =true and cs.id_service=service.id_service";
        return connectionBD.getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<ChefService> list = new ArrayList<>();
                    while (rs.next()) {
                        ChefService chefService = (ChefService) (new DataExractor()).utilisateurExrator(rs);
                        if (rs.getInt("id_service ") != 0) {
                            Service service = (new DataExractor()).serviceExrator(rs);
                            chefService.setService(service);
                        }
                        list.add(chefService);
                    }
                    return list;
                });
    }

    public ArrayList<Medcin> getListMedcin(ConnectionBD connectionBD) {
        String SQL = "select * from medcin m,utilisateur u,service where m.id=u.id_utilisateur " +
                "and active =true and m.id_service=service.id_service";
        return connectionBD.getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Medcin> list = new ArrayList<>();
                    while (rs.next()) {
                        Medcin medcin = (Medcin) (new DataExractor()).utilisateurExrator(rs);
                        medcin.setSpeiciality(rs.getString("speiciality"));
                        if (rs.getInt("id_service ") != 0) {
                            Service service = (new DataExractor()).serviceExrator(rs);
                            medcin.setService(service);
                        }
                        list.add(medcin);
                    }
                    return list;
                });
    }

//    public ArrayList<Infermiere> getListInfermiere(ConnectionBD connectionBD) {
//        String SQL = "select * from Infermiere m,utilisateur u,service where m.id_infermiere=u.id_utilisateur " +
//                "and active =true and m.id_service=service.id_service";
//        return connectionBD.getJdbcTemplate().query(SQL,
//                rs -> {
//                    ArrayList<Infermiere> list = new ArrayList<>();
//                    while (rs.next()) {
//                        Infermiere infermiere = (Infermiere) (new DataExractor()).utilisateurExrator(rs);
//                        if (rs.getInt("id_service ") != 0) {
//                            Service service = (new DataExractor()).serviceExrator(rs);
//                            infermiere.setService(service);
//                        }
//                        list.add(infermiere);
//                    }
//                    return list;
//                });
//    }

//    public Map<?, ?> getPersoneMedical(String type) {
//        String SQL = "select * from"+type +" t,utilisateur u where t.id_"+type+"=u.id_utilisateur and " +
//                "active=true";
//        (new ConnectionBD()).getJdbcTemplate().query(SQL,
//                rs -> {
//                    ArrayList<ChefService> list = new ArrayList<>();
//                    while (rs.next()) {
//                        ChefService chefService = (ChefService) (new DataExractor()).utilisateurExrator(rs);
//                        if (rs.getInt("id_service ") != 0) {
//                            Service service = (new DataExractor()).serviceExrator(rs);
//                            chefService.setService(service);
//                        }
//                        list.add(chefService);
//                    }
//                    return list;
//                });
//        return personneMedical;
//    }

    public ArrayList<String> chefserviceNotAficte() {
        String sql = "select nom,prenom from utilisateur ,chefservice cs where cs.id_service is null ";
        return (new ConnectionBD()).getJdbcTemplate().query(sql, rs -> {
            ArrayList<String> chefservices = new ArrayList<>();
            while (rs.next()) {
                String chefService = rs.getString("nom") + " " + rs.getString("prenom");
                chefservices.add(chefService);
            }
            return chefservices;
        });
    }

    public long ajoutMembre(String nom, String prenom, String email, String gender, String datedeNai,
                            String telNumbre, String type, String photo, String spiciality) {
        String defualPassword = datedeNai.replace("-", "");
        String sql = "insert INTO utilisateur (nom,prenom,email,password,numeroTel,dateNaissance,type,active,photo,gender) select ?,?,?,?,?,?,?,?,?,?" +
                "from  dual  where not exists (select * from utilisateur where email = ? and type =?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        (new ConnectionBD()).getJdbcTemplate().update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(sql);
            ps.setString(1, nom);
            ps.setString(2, prenom);
            ps.setString(3, email);
            ps.setString(4, defualPassword);
            ps.setString(5, telNumbre);
            ps.setString(6, datedeNai);
            ps.setString(7, type);
            ps.setBoolean(8, true);
            ps.setString(9, gender);
            ps.setString(10, photo);
            ps.setString(11, email);
            ps.setString(12, type);
            System.out.println(ps.toString());
            return ps;
        }, keyHolder);
        long id = keyHolder.getKey().longValue();
        if (id != 0) {
            String sql2;
            if (type.equals("Medcin"))
                sql2 = String.format("insert into %s (id,speiciality) valeue('%d','%s')", type, id);
            else
                sql2 = String.format("insert into %s (id) valeue('%d')", type, id);
            (new ConnectionBD()).getJdbcTemplate().update(sql2);

        }
        return id;
    }


}
