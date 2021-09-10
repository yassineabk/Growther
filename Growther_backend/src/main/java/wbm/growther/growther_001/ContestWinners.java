package wbm.growther.growther_001;

import wbm.growther.growther_001.payload.WinnersResponse;

import java.util.*;

public class ContestWinners {

    private class PotentialWinner{
        String email;
        long accumulatedPoints;
    }


    private List<PotentialWinner> potentialWinners=new ArrayList<>();
    private long accumulatedPoints ;
    private Random random=new Random();
    private long numberOfWinners;

    public void setNumberOfWinners(long numberOfWinners) {
        this.numberOfWinners = numberOfWinners;
    }

    public void addParticipant(String participantEmail, long participantPoints){

        accumulatedPoints+=participantPoints;
        PotentialWinner potentialWinner=new PotentialWinner();
        potentialWinner.accumulatedPoints=accumulatedPoints;
        potentialWinner.email=participantEmail;
        potentialWinners.add(potentialWinner);
    }

    public PotentialWinner getRandomWinner(){

        long rand= (long) (random.nextDouble()*accumulatedPoints);
        return lowerBound(potentialWinners,0,potentialWinners.size(),rand);

    }
    public void deleteWinner(PotentialWinner winner){

        List<PotentialWinner> copie=new ArrayList<>();
        int copieSize=0;
        long diff = 0;

        for(int i=0;i<potentialWinners.size();++i){
            if(potentialWinners.get(i).accumulatedPoints < winner.accumulatedPoints){
                copie.add(potentialWinners.get(i));
                copieSize++;
            }
            else if(potentialWinners.get(i).accumulatedPoints > winner.accumulatedPoints){
                copie.add(potentialWinners.get(i));
                copieSize++;
                copie.get(copieSize-1).accumulatedPoints-=diff;
            }
            else {
                if(i==0)
                    diff=potentialWinners.get(i).accumulatedPoints;
                else
                    diff=potentialWinners
                        .get(i).accumulatedPoints-potentialWinners.get(i-1).accumulatedPoints;
            }
        }
        accumulatedPoints=copie.get(copieSize-1).accumulatedPoints;
        potentialWinners=copie;

    }

    public List<WinnersResponse> getAllWinners(){

        List<WinnersResponse> winners= new ArrayList<>();
        int winnerRank=1;
        while (winnerRank<=numberOfWinners){

            PotentialWinner winner=getRandomWinner();
            winners.add(new WinnersResponse(winner.email,winnerRank));
            deleteWinner(winner);
            ++winnerRank;

            //if(!winners.containsKey(winnerEmail)){
            //    winners.put(winnerEmail,winnerRank);
            //    ++winnerRank;
            //}

        }
        return winners;
    }

    public  PotentialWinner lowerBound(List<PotentialWinner> arr, int first, int last, long key){

        int mid = (first + last)/2;

        while( first < last ){
            if ( arr.get(mid).accumulatedPoints < key ){
                first = mid + 1;
            }else if ( arr.get(mid).accumulatedPoints >= key ){
                last=mid;
            }
            mid = (first + last)/2;
        }
        return arr.get(mid);
    }



}
