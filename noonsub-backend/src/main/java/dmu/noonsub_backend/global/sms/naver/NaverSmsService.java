package dmu.noonsub_backend.global.sms.naver;


import dmu.noonsub_backend.domain.common.exception.CustomException;
import dmu.noonsub_backend.domain.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class NaverSmsService {
    private final NaverProperties naverProperties;
    private final StringRedisTemplate stringRedisTemplate;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendSms(String toPhoneNumber){
        String code = generateCode();
        saveVerificationCode(toPhoneNumber, code);

        String uri = String.format("https://sens.apigw.ntruss.com/sms/v2/services/%s/messages", naverProperties.getServiceId());
        String timestamp = String.valueOf(System.currentTimeMillis());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", timestamp);
        headers.set("x-ncp-iam-access-key", naverProperties.getAccessKey());
        headers.set("x-ncp-apigw-signature-v2", makeSignature(timestamp));

        Map<String, Object> body = new HashMap<>();
        body.put("type", "SMS");
        body.put("contentType", "COMM");
        body.put("countryCode", "82");
        body.put("from", naverProperties.getSenderPhone());
        body.put("content", "[Noonsub] 인증번호: " + code);
        body.put("messages", List.of(Map.of("to", toPhoneNumber)));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        restTemplate.postForEntity(uri, request, String.class);
    }

    public boolean verifyCode(String phoneNumber, String code){
        String storedCode = stringRedisTemplate.opsForValue().get("sms:verify:" + phoneNumber);
        return StringUtils.hasText(storedCode) && storedCode.equals(code);
    }

    private void saveVerificationCode(String phoneNumber, String code){
        stringRedisTemplate.opsForValue().set("sms:verify:" + phoneNumber, code, Duration.ofMinutes(3));
    }

    private String generateCode() {
        return String.valueOf((int) (Math.random() * 900000) + 100000); // 6자리 숫자
    }

    private String makeSignature(String timestamp) {
        try {
            String space = " ";
            String newLine = "\n";
            String method = "POST";
            String url = "/sms/v2/services/" + naverProperties.getServiceId() + "/messages";
            String accessKey = naverProperties.getAccessKey();
            String secretKey = naverProperties.getSecretKey();

            String message = method +
                    space +
                    url +
                    newLine +
                    timestamp +
                    newLine +
                    accessKey;

            SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(signingKey);

            byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(rawHmac);

        } catch (Exception e) {
            throw new CustomException(ErrorCode.MAKE_SIGNATURE_FAIL);
        }
    }
}
