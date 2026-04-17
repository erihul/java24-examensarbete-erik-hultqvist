import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-top-rated-movie-page',
  imports: [ CommonModule, MovieListComponent ],
  templateUrl: './top-rated-movie-page.component.html',
  styleUrl: './top-rated-movie-page.component.scss',
})
export class TopRatedMoviePageComponent implements OnInit, OnDestroy {
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
    
    this.movieService.getMovies('top_rated', this.currentPage)
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