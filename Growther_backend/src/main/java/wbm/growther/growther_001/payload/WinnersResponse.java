package wbm.growther.growther_001.payload;

import wbm.growther.growther_001.models.Prize;

public class WinnersResponse {

    private String email;
    private int rank;
    private Prize prize;

    public WinnersResponse(String email, int rank, Prize prize) {
        this.email = email;
        this.rank = rank;
        this.prize = prize;
    }

    public WinnersResponse(String email, int winnerRank) {
        this.email=email;
        this.rank=winnerRank;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public Prize getPrize() {
        return prize;
    }

    public void setPrize(Prize prize) {
        this.prize = prize;
    }
}
