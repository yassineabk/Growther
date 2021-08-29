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

    private String MonEmail="<email>";


    @Override
    @Async
    public void sendMessage(String to, String text,String subject,boolean isHtml) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper =  new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setFrom(MonEmail);
            helper.setTo(to);
            if(subject ==null)
                helper.setSubject("Email confirmation");
            else helper.setSubject(subject);
            helper.setText(text,isHtml);

            emailSender.send(mimeMessage);
        } catch (MessagingException exception) {
            exception.printStackTrace();
        }
    }
    @Override
    @Async
    public void recieveMessage(String from, String text,String subject,boolean isHtml) {
        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper =  new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setFrom(from);
            helper.setTo(MonEmail);
            if(subject ==null)
                helper.setSubject("Email confirmation");
            else helper.setSubject(subject);
            helper.setText(text,isHtml);

            emailSender.send(mimeMessage);
        } catch (MessagingException exception) {
            exception.printStackTrace();
        }
    }

}
