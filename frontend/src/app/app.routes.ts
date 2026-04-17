import { Routes } from '@angular/router';
import { MovieGuard } from './guards/movie.guard';
import { MovieListResolver } from './guards/movieList.resolver';
import { MovieResolver } from './guards/movie.resolver';
import { authGuard } from './guards/auth.guard';
import { OAuth2CallbackComponent } from './pages/oauth2-callback/oauth2-callback.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'now_playing', pathMatch: 'full' },
	{ path: 'now_playing', loadComponent: () => import('./pages/now-playing-movie-page/now-playing-movie-page.component')
		.then(m => m.NowPlayingMoviePageComponent) },
	{ path: 'popular', loadComponent: () => import('./pages/popular-movie-page/popular-movie-page.component')
		.then(m => m.PopularMoviePageComponent) },
	{ path: 'top_rated', loadComponent: () => import('./pages/top-rated-movie-page/top-rated-movie-page.component')
		.then(m => m.TopRatedMoviePageComponent) },
	{ path: 'upcoming', loadComponent: () => import('./pages/upcoming-movie-page/upcoming-movie-page.component')
		.then(m => m.UpcomingMoviePageComponent) },
	{ path: 'favourites', loadComponent: () => import('./pages/favourites-page/favourites-page.component')
		.then(m => m.FavouritesPageComponent), canActivate: [authGuard], runGuardsAndResolvers: 'always' },
	{ path: 'watchlist', loadComponent: () => import('./pages/watchlist-page/watchlist-page.component')
		.then(m => m.WatchlistPageComponent), canActivate: [authGuard], runGuardsAndResolvers: 'always' },
	{ path: 'movie/:id', loadComponent: () => import('./pages/movie-detail-page/movie-detail-page.component')
		.then(m => m.MovieDetailPageComponent), canActivate: [MovieGuard], resolve: { movie: MovieResolver } },
	{ path: 'oauth2/callback', component: OAuth2CallbackComponent },
  ];

