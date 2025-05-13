package dmu.noonsub_backend.domain.member.repository;

import dmu.noonsub_backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
