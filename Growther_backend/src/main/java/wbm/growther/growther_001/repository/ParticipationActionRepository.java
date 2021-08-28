package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.models.ParticipationAction;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipationActionRepository extends JpaRepository<ParticipationAction,Long> {
    List findAllByParticipationId(Long id);
}
