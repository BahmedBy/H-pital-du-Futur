package moudel;

import java.util.ArrayList;

public class Service {
    private long id;
    private String nom;
    private ArrayList<Chember> chembers;

    public Service() {
        this.chembers= new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public ArrayList<Chember> getChembers() {
        return chembers;
    }

    public void setChembers(ArrayList<Chember> chembers) {
        this.chembers = chembers;
    }
}
