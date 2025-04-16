package dmu.noonsub_backend.domain.member.dto;

import dmu.noonsub_backend.domain.member.enums.CertificateType;
import dmu.noonsub_backend.domain.member.enums.SignupType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSignupRequestDto {
    /**
     * 이름 (최소 2자, 최대 20자, 한글 또는 영문만 허용)
     */
    @NotBlank(message = "이름은 필수입니다.")
    @Size(min = 2, max = 20, message = "이름은 2자 이상 20자 이하로 입력해주세요.")
    @Pattern(regexp = "^[가-힣a-zA-Z]+$", message = "이름은 한글 또는 영문만 입력 가능합니다.")
    private String name;

    /**
     * 휴대폰 번호 (010-0000-0000 형식)
     */
    @NotBlank(message = "휴대폰 번호는 필수입니다.")
    @Pattern(
            regexp = "^010-\\d{4}-\\d{4}$",
            message = "휴대폰 번호는 010-0000-0000 형식이어야 합니다."
    )
    private String phoneNumber;

    /**
     * 본인인증 고유 식별값 (CI)
     */
    @NotBlank(message = "본인인증 CI 값은 필수입니다.")
    private String ci; // 본인인증 고유값

    /**
     * 본인인증 토큰
     */
    @NotBlank(message = "인증 토큰은 필수입니다.")
    private String certificateToken; // 인증토큰
    /**
     * 인증 방식 (TOSS, KAKAO 등)
     */
    @NotNull(message = "인증 방식은 필수입니다.")
    private CertificateType certificateType;
    /**
     * 가입 경로 (일반, 소셜 등)
     */
    @NotNull(message = "회원가입 타입은 필수입니다.")
    private SignupType signupType; // GENERAL, KAKAO 등
}
