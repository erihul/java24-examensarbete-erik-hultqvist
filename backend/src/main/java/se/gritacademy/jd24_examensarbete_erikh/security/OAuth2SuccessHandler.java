// security/OAuth2SuccessHandler.java
package se.gritacademy.jd24_examensarbete_erikh.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import se.gritacademy.jd24_examensarbete_erikh.entity.RefreshToken;
import se.gritacademy.jd24_examensarbete_erikh.entity.User;
import se.gritacademy.jd24_examensarbete_erikh.repository.UserRepository;
import se.gritacademy.jd24_examensarbete_erikh.service.RefreshTokenService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

        String provider = oauthToken.getAuthorizedClientRegistrationId();
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            email = oAuth2User.getAttribute("login") + "@github.local";
        }
        String name = oAuth2User.getAttribute("name") != null
                ? oAuth2User.getAttribute("name")
                : oAuth2User.getAttribute("login");

        User.AuthProvider authProvider;

        if ("github".equalsIgnoreCase(provider)) {
            authProvider = User.AuthProvider.GITHUB;
        } else if ("google".equalsIgnoreCase(provider)) {
            authProvider = User.AuthProvider.GOOGLE;
        } else {
            authProvider = User.AuthProvider.GOOGLE; // fallback
        }
        // Find or create the user
        String finalEmail = email;
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(finalEmail)
                    .username(name)
                    .provider(authProvider)
                    .role(User.Role.ROLE_USER)
                    .build();
            return userRepository.save(newUser);
        });

        // Generate tokens
        String accessToken = tokenProvider.generateTokenFromUsername(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        // Redirect to Angular with tokens in URL
        // Angular will grab them and store in localStorage
        String redirectUrl = String.format(
                "http://localhost:4200/oauth2/callback?token=%s&refreshToken=%s",
                accessToken,
                refreshToken.getToken()
        );

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}