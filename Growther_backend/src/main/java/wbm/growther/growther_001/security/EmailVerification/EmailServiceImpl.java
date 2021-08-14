package wbm.growther.growther_001.security.EmailVerification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService  {

    @Autowired
    private JavaMailSender emailSender;

    private String MonEmail="hamzabht18@gmail.com";


    @Override
    @Async
    public void sendMessage(String to, String text) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper =  new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setFrom(MonEmail);
            helper.setTo(to);
            helper.setSubject("Email confirmation");
            helper.setText(text,true);

            emailSender.send(mimeMessage);
        } catch (MessagingException exception) {
            exception.printStackTrace();
        }
    }

}
