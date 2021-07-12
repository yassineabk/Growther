package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.models.User;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
}