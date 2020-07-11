package moudel;

import java.sql.Date;
import java.sql.Time;

public class Entree {
    private String remarque;
    private Date date;
    private Time time;

    public Entree() {
    }

    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String Remarque) {
        this.remarque = Remarque;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
