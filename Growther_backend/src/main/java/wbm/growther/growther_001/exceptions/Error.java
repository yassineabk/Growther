package wbm.growther.growther_001.exceptions;

import java.util.Date;

public class Error {
    private Date time_stamp;
    private String message;
    private String details;

    public Error(Date time_stamp, String message, String details) {
        this.time_stamp = time_stamp;
        this.message = message;
        this.details = details;
    }

    public Date getTime_stamp() {
        return time_stamp;
    }

    public void setTime_stamp(Date time_stamp) {
        this.time_stamp = time_stamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
