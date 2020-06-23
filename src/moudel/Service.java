package moudel;

import java.util.ArrayList;

public class Service {
    private long id;
    private String nom;
    private ArrayList<Chembre> chembres;

    public Service() {
        this.chembres = new ArrayList<>();
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

    public ArrayList<Chembre> getChembres() {
        return chembres;
    }

    public void setChembres(ArrayList<Chembre> chembres) {
        this.chembres = chembres;
    }
}
