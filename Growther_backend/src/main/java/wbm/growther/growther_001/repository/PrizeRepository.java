package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wbm.growther.growther_001.models.Prize;

import java.util.List;

public interface PrizeRepository extends JpaRepository<Prize,Long> {
    List findAllByContestIdContest(Long contestID);
}
