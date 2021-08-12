package wbm.growther.growther_001.security.EmailVerification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepo confirmationTokenRepo;

    public void saveConfirmationToken(ConfirmationToken token){
        confirmationTokenRepo.save(token);
    }

    public ConfirmationToken getToken(String token){
        return confirmationTokenRepo.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepo.updateConfirmedAt(
                token, LocalDateTime.now());
    }

}
