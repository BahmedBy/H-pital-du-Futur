package moudel;

import java.sql.Time;
import java.sql.Date;

public class Etat {
    private double tempeture;
    private double pulsation;
    private double tonsion;
    private Date date;
    private Time time;

    public double getTempeture() {
        return tempeture;
    }

    public void setTempeture(double tempeture) {
        this.tempeture = tempeture;
    }

    public double getPulsation() {
        return pulsation;
    }

    public void setPulsation(double pulsation) {
        this.pulsation = pulsation;
    }

    public double getTonsion() {
        return tonsion;
    }

    public void setTonsion(double tonsion) {
        this.tonsion = tonsion;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getHoure() {
        return time;
    }

    public void setHoure(Time houre) {
        this.time = houre;
    }

    public Etat() {
    }
}
