package se.gritacademy.jd24_examensarbete_erikh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.gritacademy.jd24_examensarbete_erikh.entity.RefreshToken;
import se.gritacademy.jd24_examensarbete_erikh.entity.User;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUser(User user);
    void deleteByUser(User user);
}