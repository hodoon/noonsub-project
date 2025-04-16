package dmu.noonsub_backend.global.sms.naver;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SmsVerifyDto {
    @NotBlank
    private String phoneNumber; // 수신자 전화번호

    @NotBlank
    private String code;

}
