import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { MovieDetails } from "../model/movie.model";
import { MovieService } from "../services/movie.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class MovieResolver implements Resolve<MovieDetails | null> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MovieDetails | null> {
    const id = Number(route.paramMap.get('id'));
    if (!id) {
      console.error('No movie ID found in route');
      return of(null);
    }
    return this.movieService.getFullMovieDetails(id).pipe(
      catchError(err => {
        console.error('Failed to load movie details for ID:', id, err);
        return of(null);
      })
    );
  }
}
