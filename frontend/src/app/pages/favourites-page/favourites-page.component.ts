import { Component, effect, inject, signal } from '@angular/core';
import { UserMoviesService } from '../../services/user-movies.service';
import { RouterModule } from '@angular/router';
import { UserMovieListComponent } from '../../components/user-movie-list/user-movie-list.component';
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-favourites',
  imports: [ RouterModule, UserMovieListComponent ],
  templateUrl: './favourites-page.component.html',
  styleUrl: './favourites-page.component.scss',
})
export class FavouritesPageComponent {

	private userMovies = inject(UserMoviesService);
  private movieService = inject(MovieService);

  movies = signal<Movie[]>([]);

  constructor() {
    effect(() => {
      const ids = this.userMovies.favourites();

      if (!ids.length) {
        this.movies.set([]);
        return;
      }

      this.movieService.getMoviesByIds(ids)
        .subscribe(movies => this.movies.set(movies));
    });
  }

  remove(id: number) {
    this.userMovies.removeFromFavourites(id);
  }

}
