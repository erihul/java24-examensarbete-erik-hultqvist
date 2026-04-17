package se.gritacademy.jd24_examensarbete_erikh.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.gritacademy.jd24_examensarbete_erikh.dto.*;
import se.gritacademy.jd24_examensarbete_erikh.entity.RefreshToken;
import se.gritacademy.jd24_examensarbete_erikh.security.JwtTokenProvider;
import se.gritacademy.jd24_examensarbete_erikh.service.AuthService;
import se.gritacademy.jd24_examensarbete_erikh.service.RefreshTokenService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final JwtTokenProvider tokenProvider;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenService.findByToken(request.getRefreshToken());
        refreshTokenService.verifyExpiration(refreshToken);
        
        String newAccessToken = tokenProvider.generateTokenFromUsername(refreshToken.getUser().getEmail());
        
        AuthResponse response = AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken.getToken())
                .userId(refreshToken.getUser().getId())
                .email(refreshToken.getUser().getEmail())
                .username(refreshToken.getUser().getUsername())
                .role(refreshToken.getUser().getRole().name())
                .build();
        
        return ResponseEntity.ok(response);
    }
}