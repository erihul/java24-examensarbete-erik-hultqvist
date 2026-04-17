package se.gritacademy.jd24_examensarbete_erikh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import se.gritacademy.jd24_examensarbete_erikh.entity.User;
import se.gritacademy.jd24_examensarbete_erikh.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserLibraryService {

    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Long> getFavourites(String email) {
        return getUser(email).getFavourites();
    }

    public List<Long> addFavourite(String email, Long movieId) {
        User user = getUser(email);

        if (!user.getFavourites().contains(movieId)) {
            user.getFavourites().add(movieId);
        }

        return user.getFavourites();
    }

    public List<Long> removeFavourite(String email, Long movieId) {
        User user = getUser(email);
        user.getFavourites().remove(movieId);
        return user.getFavourites();
    }

    public List<Long> getWatchlist(String email) {
        return getUser(email).getWatchlist();
    }

    public List<Long> addWatchlist(String email, Long movieId) {
        User user = getUser(email);

        if (!user.getWatchlist().contains(movieId)) {
            user.getWatchlist().add(movieId);
        }

        return user.getWatchlist();
    }

    public List<Long> removeWatchlist(String email, Long movieId) {
        User user = getUser(email);
        user.getWatchlist().remove(movieId);
        return user.getWatchlist();
    }
}