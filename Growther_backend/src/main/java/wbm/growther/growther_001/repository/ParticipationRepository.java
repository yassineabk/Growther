package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wbm.growther.growther_001.models.Participation;

import java.util.List;

public interface ParticipationRepository extends JpaRepository<Participation,Long> {
    Participation findParticipationById(Long ID);
    Participation findParticipationByContestIdContestAndUserId(Long ContestID,Long UserID);
    List findAllByContestIdContest(Long ContestID);
    List findAllByUserId(Long userID);
}
