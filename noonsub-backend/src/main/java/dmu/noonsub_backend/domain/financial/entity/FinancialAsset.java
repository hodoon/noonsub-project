package dmu.noonsub_backend.domain.financial.entity;

import dmu.noonsub_backend.domain.financial.enums.AssetType;
import dmu.noonsub_backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "financial_asset")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancialAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    private AssetType assetType;

    private String provider;

    private BigDecimal balance;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "financialAsset", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FinancialTransaction> transactions = new ArrayList<>();
}
