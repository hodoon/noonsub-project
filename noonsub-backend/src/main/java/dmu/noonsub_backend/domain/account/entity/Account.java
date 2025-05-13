package dmu.noonsub_backend.domain.account.entity;

import dmu.noonsub_backend.domain.account.enums.AccountStatus;
import dmu.noonsub_backend.domain.account.enums.AccountType;
import dmu.noonsub_backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String bankName;

    @Column(nullable = false)
    private String accountNumber;  // **암호화 필요**

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @Column(nullable = false)
    private boolean openBankingLinked = false;

    private String openBankingToken;

    @CreationTimestamp
    private LocalDateTime linkedAt;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;
}
