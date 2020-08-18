package moudel;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Date;
import java.sql.Time;

public class Sortie {
    private String type;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    @JsonFormat(pattern="HH-mm-ss")

    private Time time;

    public Sortie() {
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
