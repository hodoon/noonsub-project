package dmu.noonsub_backend.domain.member.dto;

import dmu.noonsub_backend.domain.account.enums.AccountStatus;
import dmu.noonsub_backend.domain.member.enums.CertificateType;
import dmu.noonsub_backend.domain.member.enums.Role;
import dmu.noonsub_backend.domain.member.enums.SignupType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponseDto {
    private Long id;
    private String name;
    private String phoneNumber;

    private SignupType signupType;
    private Role role;
    private AccountStatus accountStatus;

    private String certificateToken;
    private CertificateType certificateType;

    private LocalDateTime accountDeletedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
