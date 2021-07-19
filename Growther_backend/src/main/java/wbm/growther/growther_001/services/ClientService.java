package wbm.growther.growther_001.services;


import wbm.growther.growther_001.dtos.ClientDto;

import java.util.List;

public interface ClientService {

    List<ClientDto> getAllClients();
    ClientDto getClientByEmailAndPassword(String Email,String Password);
    Boolean createNewClient(ClientDto NewClientDto);
    ClientDto getClientById(Long clientID);
    ClientDto getClientByEmail(String clientEmail);
    ClientDto updateClientInfos(ClientDto clientDto);
    void deleteClient(ClientDto clientDto);
    ClientDto getClientByName(String clientName);

}
