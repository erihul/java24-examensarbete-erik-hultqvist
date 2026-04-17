import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie, MovieDetails } from '../../model/movie.model';
import { MovieActionButtonComponent } from '../../components/movie-action-button/movie-action-button.component';
import { UserMoviesService } from '../../services/user-movies.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-movie-detail-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MovieActionButtonComponent],
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
	movie = signal<MovieDetails | null>(null);
	error = signal<string | null>(null);
	trailerUrl = signal<SafeResourceUrl | null>(null);
	private authService = inject(AuthService);
	private messageService = inject(MessageService);

	constructor(
		private route: ActivatedRoute,
		private sanitizer: DomSanitizer,
		private userMovies: UserMoviesService
	) {}

	ngOnInit(): void {
		const resolvedMovie = this.route.snapshot.data['movie'] as MovieDetails | null;

		if (!resolvedMovie) {
		this.error.set('Movie could not be loaded');
		return;
		}
		this.movie.set(resolvedMovie);

		if (resolvedMovie.trailerKey) {
			this.trailerUrl.set(
				this.sanitizer.bypassSecurityTrustResourceUrl(
				`https://www.youtube.com/embed/${resolvedMovie.trailerKey}`
				)
			);
		}
	}

	private toMovie(movie: MovieDetails): Movie {
		return {
			id: movie.id,
			title: movie.title,
			posterUrl: movie.posterUrl,
			backdropUrl: movie.backdropUrl,
			year: movie.year,
			rating: movie.rating,
			description: movie.description,
			adult: movie.adult,
			language: movie.language,
			popularity: movie.popularity,
		};
	}

	isFavourite(): boolean {
		const movie = this.movie();
		return !!movie && this.userMovies.favourites().includes(movie.id);
	}

	toggleFavourite(): void {
		if (!this.authService.isLoggedIn()) {
			this.messageService.add({
				severity: 'warn',
				summary: 'Login required',
				detail: 'Please log in to add favourites',
				life: 3000,
			});
			return;
		}
		const movie = this.movie();
		if (!movie) return;

		const lightMovie = this.toMovie(movie);

		this.isFavourite()
		? this.userMovies.removeFromFavourites(movie.id)
		: this.userMovies.addToFavourites(movie.id);
	}

	isInWatchlist(): boolean {
		const movie = this.movie();
		return !!movie && this.userMovies.watchList().includes(movie.id);
	}

	toggleWatchlist(): void {
		if (!this.authService.isLoggedIn()) {
			this.messageService.add({
				severity: 'warn',
				summary: 'Login required',
				detail: 'Please log in to use watchlist',
				life: 3000,
			});
			return;
		}
		const movie = this.movie();
		if (!movie) return;

		const lightMovie = this.toMovie(movie);

		this.isInWatchlist()
		? this.userMovies.removeFromWatchList(movie.id)
		: this.userMovies.addToWatchList(movie.id);
	}
}
