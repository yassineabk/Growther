package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.models.users.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client,Long> {

    Client findClientById(Long ID);
    Client findClientByEmailAndPassword(String Email,String Password);
    Client findClientByEmail(String Email);
    Client findClientByName(String Name);

}
