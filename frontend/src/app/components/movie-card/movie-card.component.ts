import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { RouterModule } from '@angular/router';
import { UserMoviesService } from '../../services/user-movies.service';
import { CommonModule } from '@angular/common';
import { MovieActionButtonComponent } from '../movie-action-button/movie-action-button.component';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [ RouterModule, CommonModule, MovieActionButtonComponent ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
	@Input({ required: true }) movie!: Movie;

	@Output() addToFavourites = new EventEmitter<Movie>();
	@Output() addToWatchList = new EventEmitter<Movie>();

	private authService = inject(AuthService);
	private messageService = inject(MessageService);

	constructor(private userMovies: UserMoviesService) {}

	isFavourite(): boolean {
    return this.userMovies.favourites().includes(this.movie.id);
  }

  isInWatchlist(): boolean {
    return this.userMovies.watchList().includes(this.movie.id);
  }
	toggleFavourite() {
		if (!this.authService.isLoggedIn()) {
			this.messageService.add({
				severity: 'warn',
				summary: 'Login required',
				detail: 'Please log in to add favourites',
				life: 3000,
			});
			return;
		}

		if (this.isFavourite()) {
		this.userMovies.removeFromFavourites(this.movie.id);
		} else {
		this.userMovies.addToFavourites(this.movie.id);
		}
	}
	toggleWatchlist() {
		if (!this.authService.isLoggedIn()) {
			this.messageService.add({
				severity: 'warn',
				summary: 'Login required',
				detail: 'Please log in to use watchlist',
				life: 3000,
			});
			return;
		}

		if (this.isInWatchlist()) {
		this.userMovies.removeFromWatchList(this.movie.id);
		} else {
		this.userMovies.addToWatchList(this.movie.id);
		}
	}
}
