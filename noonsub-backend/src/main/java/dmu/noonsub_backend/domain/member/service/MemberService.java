package dmu.noonsub_backend.domain.member.service;

import dmu.noonsub_backend.domain.common.exception.CustomException;
import dmu.noonsub_backend.domain.common.exception.ErrorCode;
import dmu.noonsub_backend.domain.member.dto.SignUpRequestDto;
import dmu.noonsub_backend.domain.member.entity.Member;
import dmu.noonsub_backend.domain.member.enums.Role;
import dmu.noonsub_backend.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final BCryptPasswordEncoder passwordEncoder;

    // 회원 존재 여부 확인
    public boolean existsByPhoneNumber(String phoneNumber) {
        return memberRepository.findAll().stream()
                .anyMatch(member -> member.getPhoneNumber().equals(phoneNumber));
    }

    @Transactional
    public Member signUp(SignUpRequestDto signUpRequestDto, String passwordCheck){
        // 1. 비밀번호 2번 입력값 확인
        if (!signUpRequestDto.equals(passwordCheck)){
            throw new CustomException(ErrorCode.ILLEGAL_PASSWORD);
        }

        // 2. 이미 가입된 회원인지 확인
        if (existsByPhoneNumber(signUpRequestDto.getPhoneNumber())){
            throw new CustomException(ErrorCode.ALREADY_REGISTERED_MEMBER);
        }

        String encodedPassword = passwordEncoder.encode(signUpRequestDto.getPassword());

        // 3. Member 엔티티 생성 및 저장(권한은 USER 기본 세팅 예시)
        Member member = Member.builder()
                .name(signUpRequestDto.getName())
                .residentNumber(signUpRequestDto.getResidentNumber())
                .phoneNumber(signUpRequestDto.getPhoneNumber())
                .mobileCarrier(signUpRequestDto.getMobileCarrier())
                .password(encodedPassword)
                .role(Role.USER)
                .build();
        return memberRepository.save(member);
    }

    // 로그인
    public Member login(String phoneNumber, String password){
        Optional<Member> optionalMember = memberRepository.findAll().stream()
                .filter(m -> m.getPhoneNumber().equals(phoneNumber))
                .findFirst();

        if (optionalMember.isEmpty()){
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
        Member member = optionalMember.get();
        if(!member.getPassword().equals(password)){
            throw new CustomException(ErrorCode.LOGIN_FAILED);
        }
        return member;
    }


}
