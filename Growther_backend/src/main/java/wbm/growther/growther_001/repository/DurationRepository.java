package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import wbm.growther.growther_001.models.Duration;

public interface DurationRepository extends JpaRepository<Duration,Long> {
}
