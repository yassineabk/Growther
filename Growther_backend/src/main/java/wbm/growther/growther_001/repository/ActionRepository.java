package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.actions.Action;

import java.util.List;

@Repository
public interface ActionRepository extends JpaRepository<Action,Long> {
    List findAllByContestIdContest(Long contestID);
}
