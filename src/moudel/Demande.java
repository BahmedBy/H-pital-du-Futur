package moudel;

import BaseDeDonneConfig.ConnectionBD;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

public class Demande extends Raport {
    private boolean tratier;
    private boolean accepte;
    private  Service service;
    private String rasian;
private  Patient patient;

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public boolean isTratier() {
        return tratier;
    }

    public void setTratier(boolean tratier) {
        this.tratier = tratier;
    }

    public boolean isAccepte() {
        return accepte;
    }

    public void setAccepte(boolean accepte) {
        this.accepte = accepte;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getRasian() {
        return rasian;
    }

    public void setRasian(String rasian) {
        this.rasian = rasian;
    }
    public ArrayList<Demande>demandesOfService(Long idService){
        String sal="select * from domande d,raport r where d.id_domande=r.id_raport and d.traiter=false and d.id_Service="+idService;
        return (new ConnectionBD()).getJdbcTemplate().query(sal,rs->{
            ArrayList<Demande>demandes=new ArrayList<>();
            while (rs.next()){
                Demande demande=new Demande();
                demande.setId(rs.getLong("id_domande"));
                demande.setType(rs.getString("type"));
                demande.setContenu(rs.getString("contenu"));
                try {
                    demande.setMedecin((new Medecin()).loadMedcine(rs.getInt("id_medecin")).get());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
                demandes.add(demande);
            }

            return demandes;
        } );
    }
    public void Accepet(long idDemane){
        String sql="update domande set tratier=true,reponse=true where id_domande="+idDemane;
        (new ConnectionBD()).getJdbcTemplate().update(sql);
    }
    public void refsus(long idDemane,String res){
        String sql="update domande set tratier=true,reponse=fasle ,set raison"+res+" where id_domande="+idDemane;
        (new ConnectionBD()).getJdbcTemplate().update(sql);
    }
}
