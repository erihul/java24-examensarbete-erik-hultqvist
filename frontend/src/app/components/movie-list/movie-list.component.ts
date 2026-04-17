import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { Movie } from '../../model/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [ MovieCardComponent, CommonModule ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {	
	@Input({ required: true }) movies: Movie[] = [];
	@Input() isLoading = false;

	@Output() loadMore = new EventEmitter<void>();
	@Output() addToFavourites = new EventEmitter<Movie>();
	@Output() addToWatchList = new EventEmitter<Movie>();

	trackByMovie(index: number, movie: Movie) {
		return movie.id;
	}
}
