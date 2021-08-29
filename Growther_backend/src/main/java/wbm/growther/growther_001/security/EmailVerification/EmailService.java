package wbm.growther.growther_001.security.EmailVerification;

public interface EmailService {

    void sendMessage(String to, String text,String subject,boolean isHtml);

    void recieveMessage(String from, String text,String subject,boolean isHtml);

}
