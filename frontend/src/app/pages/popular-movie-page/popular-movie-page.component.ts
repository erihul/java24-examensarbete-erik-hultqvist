import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-popular-movie-page',
  imports: [ CommonModule, MovieListComponent ],
  templateUrl: './popular-movie-page.component.html',
  styleUrl: './popular-movie-page.component.scss',
})
export class PopularMoviePageComponent implements OnInit, OnDestroy {
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
		
		this.movieService.getMovies('popular', this.currentPage)
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
