package BaseDeDonneConfig;

import moudel.Chembre;
import moudel.DossierMedical;
import moudel.Patient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@EnableAsync
public class RecherchePatient {
    public Patient PatientDetail(String id, String type) {
        String active = "and mort=false";
        String SQL = "select * from utilisateur u,patient p where type='Patient' and u.id_utilisateur=p.id and u.id_utilisateur=" + id;
        if (type.equals("Infermiere"))
            SQL = SQL + " " + active;
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            Patient patient = null;
            if (rs.next()) {
                patient = (new DataExractor()).patientExrator(rs);

                try {
                    patient.setDossierMedica(this.getDossierMedicalPatient(patient).get());
                    if (patient.getHospitalise())
                        patient.setChembre(this.getChembrePatient(patient).get());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
            }

            return patient;
        });
    }

    public Patient RecherchePatientById(String id, String type) {
        String active = "and mort=false";
        String SQL = "select id_utilisateur,nom,prenom,photo,gender,dateNaissance from utilisateur u,patient p where type='Patient' and u.id_utilisateur=p.id  and u.id_utilisateur=" + id;
        if (type.equals("Infermiere")) {
            SQL = SQL + " " + active;
        }
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            Patient patient = null;
            if (rs.next())
                patient = (new DataExractor()).pationExratorNomId(rs);
            return patient;
        });
    }

    public ArrayList<Patient> RecherchePatientByNomPrenom(String nom, String prenom, String type) {
        String active = "and mort=false ";
        String SQL = "select id_utilisateur,nom,prenom,photo,dateNaissance,gender from utilisateur u,patient p where type='Patient' and u.id_utilisateur=p.id and( nom like '%" + nom + "%' or prenom like '%" +
                prenom + "%')";
        if (type.equals("Infermiere")) {
            SQL = SQL + " " + active;
        }
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            ArrayList<Patient> patients = new ArrayList<>();
            while (rs.next()) {
                Patient patient = (new DataExractor()).pationExratorNomId(rs);
                patients.add(patient);
            }
            return patients;
        });
    }

    @Async
    public Future<DossierMedical> getDossierMedicalPatient(Patient patient) {
        String SQL = "select * from dossiermedical where Id_patient=" + patient.getId();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            DossierMedical dossierMedical = null;
            if (rs.next()) {
                dossierMedical = (new DataExractor().dossierMedicalExractor(rs));
            }

            return new AsyncResult<DossierMedical>(dossierMedical);

        });
    }

    @Async
    public Future<Chembre> getChembrePatient(Patient patient) {
        String SQL = "select * from chembre c,service s where c.id_service=s.id_service and plein=true and c.id_patient=" + patient.getId();
        return (new ConnectionBD()).getJdbcTemplate().query(SQL, rs -> {
            Chembre chembre = null;
            if (rs.next()) {
                chembre = (new DataExractor().chembreExractor(rs));
                chembre.setService((new DataExractor().serviceExrator(rs)));
            }
            return new AsyncResult<Chembre>(chembre);

        });
    }
}
