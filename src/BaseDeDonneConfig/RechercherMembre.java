package BaseDeDonneConfig;

import moudel.ChefService;
import moudel.Patient;
import moudel.Service;
import moudel.Utilisateur;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
@EnableAsync
public class RechercherMembre {
    public Utilisateur MembreDetail(String id, String type) {

        String SQL = "select * from utilisateur u,"+type+" t" +
                " where u.id_utilisateur=t.id_"+type+" and active=true and id_utilisateur=" + id;

        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            Utilisateur utilisateur = null;
            if (rs.next()) {
                utilisateur = (new DataExractor()).utilisateurExrator(rs,true );

                try {
                    if(utilisateur.getType().equals("ChefService"))
                    {
                        ((ChefService)utilisateur).setService(this.loadService(utilisateur).get());
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
            }

            return utilisateur;
        });
    }
    @Async
    public Future<Service> loadService(Utilisateur utilisateur ){
        String SQL="select * from "+utilisateur.getType()+" t,service s where t.id_service=s.id_service";
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            Service service = null;
            if (rs.next())
                service = (new DataExractor()).serviceExrator(rs);
            return new AsyncResult<>(service);
        });
    }
    public Utilisateur RechercheMembreById(String id) {
        String SQL = "select id_utilisateur,nom,prenom,photo,gender,dateNaissance,type " +
                "from utilisateur  where type!='Patient' and type!='Admin' and u.id_utilisateur=" + id;

        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            Utilisateur utilisateur = null;
            if (rs.next())
                utilisateur = (new DataExractor()).utilisateurExratorIdNom(rs,false );
            return utilisateur;
        });
    }

    public ArrayList<Utilisateur> RechercheMembreByNomPrenom(String nom, String prenom) {

        String SQL = "select id_utilisateur,nom,prenom,photo,dateNaissance,gender,type " +
                "from utilisateur u where type!='Patient' and type!='Admin' and( nom like '%" + nom + "%' or prenom like '%" +
                prenom + "%')";

        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            ArrayList<Utilisateur> utilisateurs = new ArrayList<>();
            while (rs.next()) {
                Utilisateur utilisateur = (new DataExractor()).utilisateurExratorIdNom(rs,false );
                utilisateurs.add(utilisateur);
            }
            return utilisateurs;
        });}
}
