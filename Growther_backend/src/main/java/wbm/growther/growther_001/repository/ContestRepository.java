package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.models.Contest;

import java.util.List;

@Repository

public interface ContestRepository extends JpaRepository<Contest,Long> {
    Contest findContestByIdContest(Long ID);
    Contest findContestByTitle(String Title);
    Contest findContestByTitleAndIdContest(String Title,Long ID);
    Contest findTopByOrderByIdContestDesc();
}
