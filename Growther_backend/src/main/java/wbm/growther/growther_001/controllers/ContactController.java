package wbm.growther.growther_001.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wbm.growther.growther_001.payload.GmailMsg;
import wbm.growther.growther_001.security.EmailVerification.EmailService;

import java.util.concurrent.RejectedExecutionException;
@RestController
@RequestMapping("/contactus/send")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("email")
    public ResponseEntity<String> sendEmail(@Validated @RequestBody GmailMsg gmailMsg){


        String sender="From "+gmailMsg.getName()+" : "+gmailMsg.getEmail()+"\n\n\n";
        try {
            emailService.recieveMessage(
                    gmailMsg.getEmail(),
                    sender+"\n"+gmailMsg.getMessage(),
                    gmailMsg.getSubject(),
                    false
            );
        }catch (RejectedExecutionException e){
          throw e;
        }

        return ResponseEntity.ok().body("Message sent successfully");
    }

}