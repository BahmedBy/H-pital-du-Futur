package moudel;

import java.sql.Date;
import java.sql.Time;

public class Entree {
    private String type;
    private Date date;
    private Time time;

    public Entree() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
