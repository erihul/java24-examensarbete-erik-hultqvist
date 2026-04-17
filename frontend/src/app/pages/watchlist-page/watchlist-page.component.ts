import { Component, effect, inject, signal } from '@angular/core';
import { UserMoviesService } from '../../services/user-movies.service';
import { RouterModule } from '@angular/router';
import { UserMovieListComponent } from "../../components/user-movie-list/user-movie-list.component";
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
	standalone: true,
  selector: 'app-watchlist',
  imports: [RouterModule, UserMovieListComponent],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
})
export class WatchlistPageComponent {

	private movieService = inject(MovieService);
	private userMovies = inject(UserMoviesService);

	movies = signal<Movie[]>([]);

	loadEffect = effect(() => {
    const ids = this.userMovies.watchList();

    console.log('WATCHLIST IDS:', ids);

    if (!ids.length) {
      this.movies.set([]);
      return;
    }

    this.movieService.getMoviesByIds(ids)
      .subscribe(movies => this.movies.set(movies));
  });

	remove(id: number) {
    this.userMovies.removeFromWatchList(id);
  }
}
