package dmu.noonsub_backend.global.sms.naver;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sms")
@RequiredArgsConstructor
public class SmsController {
    private final NaverSmsService naverSmsService;

    @PostMapping("/send")
    public ResponseEntity<?> sendSms(@RequestBody @Valid SmsRequestDto dto){
        naverSmsService.sendSms(dto.getPhoneNumber());
        return ResponseEntity.ok("SMS sent successfully");
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody @Valid SmsVerifyDto dto){
        boolean isValid = naverSmsService.verifyCode(dto.getPhoneNumber(), dto.getCode());
        return isValid ? ResponseEntity.ok("인증 성공") : ResponseEntity.badRequest().body("verify fail");
    }
}
