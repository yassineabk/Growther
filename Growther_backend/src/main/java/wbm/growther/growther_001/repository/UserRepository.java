package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.models.users.User;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT u from User u WHERE u.email=:email")
    User findByEmail(@Param("email") String email);



    @Query("SELECT u from User u WHERE u.name=:username")
    User findByName(@Param("username") String username);

    Boolean existsByEmail(String email);

}