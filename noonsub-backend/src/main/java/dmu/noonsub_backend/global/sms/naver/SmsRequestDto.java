package dmu.noonsub_backend.global.sms.naver;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SmsRequestDto {
    @NotBlank
    private String phoneNumber;
}
