package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Admin extends Utilisateur {
    public Map<?,?> statistique (){
        ConnectionBD connectionBD=new ConnectionBD();
        Map<String,Integer>stat=new HashMap<>();
        stat.put("NService", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM service", Integer.class ));
        stat.put("NMedcin", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur where type ='Medcin' and active ='1'", Integer.class ));
        stat.put("NInfermiere", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur where type ='Infermiere' and active ='1'", Integer.class ));
        stat.put("NPartient", connectionBD.getJdbcTemplate().queryForObject("SELECT COUNT(*) FROM utilisateur where type ='Partient' and active ='1'", Integer.class ));
        return stat;
    }
    public ArrayList<Service> getListService(){

        String SQL = "select * from service";

        return  (new ConnectionBD()).getJdbcTemplate().query(SQL,
                rs -> {

                    ArrayList<Service> list = new ArrayList<>();
                    while (rs.next()) {
                        Service service = new Service();
                        service.setId(rs.getInt("id_service "));
                        service.setNom(rs.getString("nom"));
                        list.add(service);
                    }
                    return list;
                });
    }
    public ArrayList<ChefService> getListChefService(ConnectionBD connectionBD){
        String SQL = "select * from chefservice cs,utilisateur u,service where cs.id_chefService=u.id_utilisateur " +
                "and active =true and cs.id_service=service.id_service";
        return connectionBD.getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<ChefService> list = new ArrayList<>();
                    while (rs.next()) {
                        ChefService chefService= (ChefService) DataExractor.utilisateurExrator(rs);
                        if (rs.getInt("id_service ")!=0){
                        Service service = DataExractor.serviceExrator(rs);
                        chefService.setService(service);
                        }
                        list.add(chefService);
                    }
                    return list;
                });
    }
     public ArrayList<Medcin> getListMedcin(ConnectionBD connectionBD){
        String SQL = "select * from medcin m,utilisateur u,service where m.id=u.id_utilisateur " +
                "and active =true and m.id_service=service.id_service";
        return connectionBD.getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Medcin> list = new ArrayList<>();
                    while (rs.next()) {
                        Medcin medcin= (Medcin) DataExractor.utilisateurExrator(rs);
                        medcin.setSpeiciality(rs.getString("speiciality"));
                        if (rs.getInt("id_service ")!=0){
                            Service service = DataExractor.serviceExrator(rs);
                            medcin.setService(service);
                        }
                        list.add(medcin);
                    }
                    return list;
                });
    }
    public ArrayList<Infermiere> getListInfermiere(ConnectionBD connectionBD){
        String SQL = "select * from Infermiere m,utilisateur u,service where m.id_infermiere=u.id_utilisateur " +
                "and active =true and m.id_service=service.id_service";
        return connectionBD.getJdbcTemplate().query(SQL,
                rs -> {
                    ArrayList<Infermiere> list = new ArrayList<>();
                    while (rs.next()) {
                        Infermiere infermiere= (Infermiere) DataExractor.utilisateurExrator(rs);

                        if (rs.getInt("id_service ")!=0){
                            Service service = DataExractor.serviceExrator(rs);
                            infermiere.setService(service);
                        }
                        list.add(infermiere);
                    }
                    return list;
                });
    }
    public Map<?,?> getPersoneMedical(){
        ConnectionBD connectionBD=new ConnectionBD();
        Map<String, List> personneMedical=new HashMap<>();
        personneMedical.put("chefService", this.getListChefService(connectionBD));
        personneMedical.put("Medcin", this.getListMedcin(connectionBD));
        personneMedical.put("Infermiere", this.getListInfermiere(connectionBD));
        return personneMedical;
    }
    }
