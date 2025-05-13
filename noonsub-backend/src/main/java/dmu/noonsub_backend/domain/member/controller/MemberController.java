package dmu.noonsub_backend.domain.member.controller;

import dmu.noonsub_backend.domain.member.dto.MemberVerifyRequestDto;
import dmu.noonsub_backend.domain.member.dto.PasswordRequest;
import dmu.noonsub_backend.domain.member.dto.SignUpRequestDto;
import dmu.noonsub_backend.domain.member.entity.Member;
import dmu.noonsub_backend.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    // 회원 여부 체크
    @PostMapping("/exists")
    public ResponseEntity<?> checkMemberExists(@RequestBody @Valid MemberVerifyRequestDto dto){
        boolean exists = memberService.existsByPhoneNumber(dto.getPhoneNumber());
        return ResponseEntity.ok(exists);
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpRequestDto dto){
        Member member = memberService.signUp(dto, dto.getPasswordCheck());
        return ResponseEntity.ok(member.getId());
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid PasswordRequest request){
        Member member = memberService.login(request.getPhoneNumber(), request.getPassword());
        return ResponseEntity.ok(member.getId());
    }
}
