import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-upcoming-movie-page',
  imports: [ CommonModule, MovieListComponent ],
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
})
export class UpcomingMoviePageComponent implements OnInit, OnDestroy {
	movies: Movie[] = [];
	currentPage = 1;
	isLoading = false;
	
	private destroy$ = new Subject<void>();

	constructor(
		private movieService: MovieService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.loadMovies();
	}

	loadMovies() {
		if (this.isLoading) return;
		
		this.isLoading = true;
		
		this.movieService.getMovies('upcoming', this.currentPage)
		.pipe(takeUntil(this.destroy$))
		.subscribe({
			next: movies => {
				this.movies = [...this.movies, ...movies];
				this.currentPage++;
				this.isLoading = false;
				this.cdr.detectChanges();
			},
			error: err => {
				console.error('Failed to load movies', err);
				this.isLoading = false;
				this.cdr.detectChanges();
			}
		});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}