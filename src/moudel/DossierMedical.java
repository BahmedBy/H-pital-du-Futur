package moudel;

import java.util.ArrayList;

public class DossierMedical {
    private long id;

    private Patient patient;
    private String groupage;
    private ArrayList<Etat> etats;
    private boolean suppreme;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getGroupage() {
        return groupage;
    }

    public void setGroupage(String groupage) {
        this.groupage = groupage;
    }

    public ArrayList<Etat> getEtats() {
        return etats;
    }

    public void setEtats(ArrayList<Etat> etats) {
        this.etats = etats;
    }

    public boolean isSuppreme() {
        return suppreme;
    }

    public void setSuppreme(boolean suppreme) {
        this.suppreme = suppreme;
    }

    public DossierMedical() {
        etats= new ArrayList<>();
    }

}
