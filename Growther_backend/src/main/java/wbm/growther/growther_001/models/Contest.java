package wbm.growther.growther_001.models;

import wbm.growther.growther_001.models.actions.Action;

import java.util.Date;
import java.util.List;

public class Contest {

    private long id;
    private String name;
    private String description;
    private int nbrPrizes;
    private int nbrActions;
    private Date startDate;
    private Date endDate;
    private List<Action> actions;
    private List<Prize> prizes;

    public Contest(String name, String description,
                   Date startDate, Date endDate,
                   List<Action> actions, List<Prize> prizes) {

        this.name = name;
        this.description = description;
        this.nbrPrizes = prizes.size();
        this.nbrActions = actions.size();
        this.startDate = startDate;
        this.endDate = endDate;
        this.actions = actions;
        this.prizes = prizes;
    }

    public Contest() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNbrPrizes() {
        return prizes.size();
    }

    public void setNbrPrizes(int nbrPrizes) {
        this.nbrPrizes = nbrPrizes;
    }

    public int getNbrActions() {
        return actions.size();
    }

    public void setNbrActions(int nbrActions) {
        this.nbrActions = nbrActions;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Action> getActions() {
        return actions;
    }

    public void setActions(List<Action> actions) {
        this.actions = actions;
    }

    public List<Prize> getPrizes() {
        return prizes;
    }

    public void setPrizes(List<Prize> prizes) {
        this.prizes = prizes;
    }



}
