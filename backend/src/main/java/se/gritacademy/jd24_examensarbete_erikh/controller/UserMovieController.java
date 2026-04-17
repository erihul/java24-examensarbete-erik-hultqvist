package se.gritacademy.jd24_examensarbete_erikh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import se.gritacademy.jd24_examensarbete_erikh.entity.User;
import se.gritacademy.jd24_examensarbete_erikh.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class UserMovieController {

    private final UserRepository userRepository;

    private User getUser(Authentication auth) {
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/favourites")
    public List<Long> getFavourites(Authentication auth) {
        return getUser(auth).getFavourites();
    }

    @PostMapping("/favourites/{movieId}")
    public void addFavourite(@PathVariable Long movieId, Authentication auth) {
        User user = getUser(auth);

        if (!user.getFavourites().contains(movieId)) {
            user.getFavourites().add(movieId);
            userRepository.save(user);
        }
    }

    @DeleteMapping("/favourites/{movieId}")
    public void removeFavourite(@PathVariable Long movieId, Authentication auth) {
        User user = getUser(auth);

        user.getFavourites().remove(movieId);
        userRepository.save(user);
    }

    @GetMapping("/watchlist")
    public List<Long> getWatchlist(Authentication auth) {
        return getUser(auth).getWatchlist();
    }

    @PostMapping("/watchlist/{movieId}")
    public void addWatchlist(@PathVariable Long movieId, Authentication auth) {
        User user = getUser(auth);

        if (!user.getWatchlist().contains(movieId)) {
            user.getWatchlist().add(movieId);
            userRepository.save(user);
        }
    }

    @DeleteMapping("/watchlist/{movieId}")
    public void removeWatchlist(@PathVariable Long movieId, Authentication auth) {
        User user = getUser(auth);

        user.getWatchlist().remove(movieId);
        userRepository.save(user);
    }
}