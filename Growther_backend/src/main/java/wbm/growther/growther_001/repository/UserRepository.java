package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.models.users.User;


@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findUserByEmail(String email);
    User findUserByName(String username);
    User findUserById (Long id);
    Boolean existsByEmail(String email);
}