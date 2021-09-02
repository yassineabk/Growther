package wbm.growther.growther_001.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import wbm.growther.growther_001.models.Prize;
import wbm.growther.growther_001.models.actions.Action;
import wbm.growther.growther_001.models.users.User;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;
import java.util.TimeZone;

public class ContestDto {

    private static final SimpleDateFormat dateformat=
            new SimpleDateFormat("yyyy-MM-dd HH:mm");


    private long idContest;
    private String title;
    private String description;
    private int winnersNbr;
    private int actionsNbr;
    private int minPoints;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String timeZone;
    private Boolean immediately;
    private Set<Action> actions;
    private Set<Prize> prizes;
    private User user;
    private String status;
    private int NumOfParticipation;

    public int getNumOfParticipation() {
        return NumOfParticipation;
    }

    public void setNumOfParticipation(int numOfParticipation) {
        NumOfParticipation = numOfParticipation;
    }

    @JsonProperty
    public long getIdContest() {
        return idContest;
    }

    @JsonIgnore
    public void setIdContest(long idContest) {
        this.idContest = idContest;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String toString() {
        return "ContestDto{" +
                "idContest=" + idContest +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", winnersNbr=" + winnersNbr +
                ", actionsNbr=" + actionsNbr +
                ", maxReach=" + minPoints +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", actions=" + actions +
                ", prizes=" + prizes +
                ", user=" + user +
                ", status='" + status + '\'' +
                '}';
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getWinnersNbr() {
        return winnersNbr;
    }

    public void setWinnersNbr(int winnersNbr) {
        this.winnersNbr = winnersNbr;
    }

    public int getActionsNbr() {
        return actionsNbr;
    }

    public void setActionsNbr(int actionsNbr) {
        this.actionsNbr = actionsNbr;
    }

    public int getMinPoints() {
        return minPoints;
    }

    public void setMinPoints(int minPoints) {
        this.minPoints = minPoints;
    }

    public Boolean getImmediately() {
        return immediately;
    }

    public void setImmediately(Boolean immediately) {
        this.immediately = immediately;
    }


    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }

    public Set<Prize> getPrizes() {
        return prizes;
    }

    public void setPrizes(Set<Prize> prizes) {
        this.prizes = prizes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Date getDateInServerTimezone(String timezone,String date) throws ParseException {
        System.out.println(timezone);
        System.out.println(TimeZone.getDefault().getID());
        dateformat.setTimeZone(TimeZone.getTimeZone(timezone));
        return dateformat.parse(convertDate(date));
    }

    public void setDateInUserTimezone(Date startDate,Date endDate,String timezone){

        dateformat.setTimeZone(TimeZone.getTimeZone(timezone));
        this.endDate=dateformat.format(endDate);
        this.startDate=dateformat.format(startDate);
    }
    public String convertDate(String date){

        StringBuilder convertedDate=new StringBuilder();
        for(int i=0;i<date.length();i++){
            if(date.charAt(i)!='T')convertedDate.append(date.charAt(i));
            else convertedDate.append(' ');
        }

        return convertedDate.toString();
    }



}
