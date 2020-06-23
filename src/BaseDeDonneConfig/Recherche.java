package BaseDeDonneConfig;

import moudel.Patient;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
public class Recherche {
    public Patient RecherchePatientById(String id){
     String SQL="select * from utilisateur where active=ture and type='Patient' and id_utilisateur="+id;
        return getPatient(SQL);
    }
    public Patient RecherchePatientByNomPrenom(String nom ,String prenom){
        String SQL="select * from utilisateur where active=ture and type='Patient' and nom like '%"+nom+"%' or prenom like '%"+
                prenom+"%'";
        return getPatient(SQL);
    }

    private Patient getPatient(String SQL) {
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs->{
            Patient patient=null;
            while (rs.next())
                patient= (Patient) (new DataExractor()).utilisateurExrator(rs);
            return patient;
        });
    }
}
