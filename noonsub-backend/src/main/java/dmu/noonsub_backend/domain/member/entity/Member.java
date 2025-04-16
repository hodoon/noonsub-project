package dmu.noonsub_backend.domain.member.entity;

import dmu.noonsub_backend.domain.account.enums.AccountStatus;
import dmu.noonsub_backend.domain.common.BaseEntity;
import dmu.noonsub_backend.domain.member.enums.CertificateType;
import dmu.noonsub_backend.domain.member.enums.Role;
import dmu.noonsub_backend.domain.member.enums.SignupType;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@Table(name = "member", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"phoneNumber"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String residentNumber;

    @Column
    private String password;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

}

