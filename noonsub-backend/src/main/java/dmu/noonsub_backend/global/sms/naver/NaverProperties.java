package dmu.noonsub_backend.global.sms.naver;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import static dmu.noonsub_backend.global.util.Base64DecoderUtil.decodeBase64;

@Component
@ConfigurationProperties(prefix = "naver.sms")
@Slf4j
@Getter
@Setter
public class NaverProperties {
    private String accessKey;
    private String secretKey;
    private String serviceId;
    private String senderPhone;

    @PostConstruct
    public void decodeKeys() {
        this.accessKey = decodeBase64(this.accessKey);
        this.secretKey = decodeBase64(this.secretKey);
        this.serviceId = decodeBase64(this.serviceId);
        this.senderPhone = decodeBase64(this.senderPhone);
    }
}
