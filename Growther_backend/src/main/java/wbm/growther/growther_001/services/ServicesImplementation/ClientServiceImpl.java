package wbm.growther.growther_001.services.ServicesImplementation;

import org.springframework.stereotype.Service;
import wbm.growther.growther_001.dtos.ClientDto;
import wbm.growther.growther_001.services.ClientService;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {
    @Override
    public List<ClientDto> getAllClients() {
        return null;
    }

    @Override
    public ClientDto getClientByEmailAndPassword(String Email, String Password) {
        return null;
    }

    @Override
    public Boolean createNewClient(ClientDto NewClientDto) {
        return null;
    }

    @Override
    public ClientDto getClientById(Long clientID) {
        return null;
    }

    @Override
    public ClientDto getClientByEmail(String clientEmail) {
        return null;
    }

    @Override
    public ClientDto updateClientInfos(ClientDto clientDto) {
        return null;
    }

    @Override
    public void deleteClient(ClientDto clientDto) {

    }

    @Override
    public ClientDto getClientByName(String clientName) {
        return null;
    }
}
