package moudel;

import BaseDeDonneConfig.ConnectionBD;
import BaseDeDonneConfig.DataExractor;
import org.springframework.test.context.jdbc.Sql;

public class Chembre {
    private String numero;
    private boolean plein;
    private Service service;
    private Patient patient;

    public Chembre(String numero) {
        this.numero = numero;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public boolean isPlein() {
        return plein;
    }

    public void setPlein(boolean plein) {
        this.plein = plein;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Chembre() {
    }
    public void LoadPatient(){
        String sql="select * from chembre c,patient p,utilisateur u where c.id_patient=p.id and p.id=u.id_utilisateur and c.numero='"+this.getNumero()+"'";
        this.setPatient((new ConnectionBD()).getJdbcTemplate().query(sql,rs->{
            Patient patient=null;
            if (rs.next())
                patient=(new DataExractor()).pationExratorNomId(rs);
            return patient;
        } ));
    }
}
