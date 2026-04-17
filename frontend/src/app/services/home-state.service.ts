import { Injectable } from "@angular/core";
import { Movie } from "../model/movie.model";

export type MovieCategory =
  | 'now_playing'
  | 'popular'
  | 'top_rated'
  | 'upcoming';

@Injectable({ providedIn: 'root' })
export class HomeStateService {
  category: MovieCategory = 'now_playing';
  currentPage = 1;
  movies: Movie[] = [];
  scrollY = 0;
}