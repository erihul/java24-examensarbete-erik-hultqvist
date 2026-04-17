import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Actor, Movie, MovieDetails, Person } from '../model/movie.model';
import { ApiMovieListResponse, ApiMovie, ApiMovieDetails, ApiCredits, ApiVideos, ApiReviews } from '../model/movie-api.models';
import { MovieMapper } from './movie.mapper';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiUrl = environment.apiBaseUrl;
  private readonly apiKey = environment.apiKey;
  private readonly imageBaseUrl = environment.imageBaseUrl;

  constructor(private http: HttpClient) {}
  
  getMovies(category: string, page: number = 1): Observable<Movie[]> {
    return this.http
      .get<ApiMovieListResponse>(`${this.apiUrl}/movie/${category}`, {
        params: { api_key: this.apiKey, page },
      })
      .pipe(map(response => MovieMapper.toMoviesList(response, this.imageBaseUrl)));
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
  return this.http
    .get<ApiMovieDetails>(`${this.apiUrl}/movie/${id}`, { params: { api_key: this.apiKey } })
    .pipe(map(details => MovieMapper.toMovieDetails(details, this.imageBaseUrl)));
}

  getFullMovieDetails(id: number): Observable<MovieDetails> {
    const details$ = this.http.get<ApiMovieDetails>(`${this.apiUrl}/movie/${id}`, { params: { api_key: this.apiKey } });
    const credits$ = this.http.get<ApiCredits>(`${this.apiUrl}/movie/${id}/credits`, { params: { api_key: this.apiKey } });
    const videos$ = this.http.get<ApiVideos>(`${this.apiUrl}/movie/${id}/videos`, { params: { api_key: this.apiKey } });
    const reviews$ = this.http.get<ApiReviews>(`${this.apiUrl}/movie/${id}/reviews`, { params: { api_key: this.apiKey } });

    return forkJoin({ details: details$, credits: credits$, videos: videos$, reviews: reviews$ }).pipe(
      map(({ details, credits, videos, reviews }) =>
        MovieMapper.toMovieDetails(details, this.imageBaseUrl, credits, videos, reviews)
      )
    );
  }
   getMovieCredits(id: number): Observable<{ director?: Person; actors: Actor[] }> {
    return this.http.get<ApiCredits>(`${this.apiUrl}/movie/${id}/credits`, {
      params: { api_key: this.apiKey }
    }).pipe(
      map(credits => {
        const directorCrew = credits.crew.find(c => c.job === 'Director');
        const director = directorCrew ? MovieMapper.toPerson(directorCrew) : undefined;

        const actors = (credits.cast || [])
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .slice(0, 3)
          .map(a => MovieMapper.toActor(a, this.imageBaseUrl));

        return { director, actors };
      })
    );
  }

	getMoviesByIds(ids: number[]): Observable<Movie[]> {
		return forkJoin(
			ids.map(id =>
				this.http
					.get<ApiMovieDetails>(`${this.apiUrl}/movie/${id}`, {
						params: { api_key: this.apiKey }
					})
					.pipe(
						map(apiMovie =>
							MovieMapper.toMovieDetails(apiMovie, this.imageBaseUrl)
						),
						map(details => ({
							id: details.id,
							title: details.title,
							posterUrl: details.posterUrl,
							backdropUrl: details.backdropUrl,
							year: details.year,
							rating: details.rating,
							description: details.description,
							adult: details.adult,
							language: details.language,
							popularity: details.popularity,
						}))
					)
			)
		);
	}
}
