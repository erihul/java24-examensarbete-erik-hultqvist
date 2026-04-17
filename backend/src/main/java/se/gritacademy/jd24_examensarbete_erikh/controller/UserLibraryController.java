package se.gritacademy.jd24_examensarbete_erikh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import se.gritacademy.jd24_examensarbete_erikh.service.UserLibraryService;

import java.util.List;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
public class UserLibraryController {

    private final UserLibraryService service;

    @GetMapping("/favourites")
    public ResponseEntity<List<Long>> getFavourites(Authentication auth) {
        return ResponseEntity.ok(service.getFavourites(auth.getName()));
    }

    @PostMapping("/favourites/{movieId}")
    public ResponseEntity<List<Long>> addFavourite(
            Authentication auth,
            @PathVariable Long movieId
    ) {
        return ResponseEntity.ok(service.addFavourite(auth.getName(), movieId));
    }

    @DeleteMapping("/favourites/{movieId}")
    public ResponseEntity<List<Long>> removeFavourite(
            Authentication auth,
            @PathVariable Long movieId
    ) {
        return ResponseEntity.ok(service.removeFavourite(auth.getName(), movieId));
    }

    @GetMapping("/watchlist")
    public ResponseEntity<List<Long>> getWatchlist(Authentication auth) {
        return ResponseEntity.ok(service.getWatchlist(auth.getName()));
    }

    @PostMapping("/watchlist/{movieId}")
    public ResponseEntity<List<Long>> addWatchlist(
            Authentication auth,
            @PathVariable Long movieId
    ) {
        return ResponseEntity.ok(service.addWatchlist(auth.getName(), movieId));
    }

    @DeleteMapping("/watchlist/{movieId}")
    public ResponseEntity<List<Long>> removeWatchlist(
            Authentication auth,
            @PathVariable Long movieId
    ) {
        return ResponseEntity.ok(service.removeWatchlist(auth.getName(), movieId));
    }
}
