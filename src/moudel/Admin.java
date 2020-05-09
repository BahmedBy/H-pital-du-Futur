package moudel;

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
    public ArrayList<Service> listService(){
        ConnectionBD connectionBD=new ConnectionBD();
        String SQL = "select * from service";

        return (new ConnectionBD()).getJdbcTemplate().query(SQL,
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
    }
