import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserMoviesService {

  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private API = 'http://localhost:8080/api/library';

  favourites = signal<number[]>([]);
  watchList = signal<number[]>([]);

	 constructor() {
    effect(() => {
      const user = this.auth.currentUser();

      if (user) {
        this.loadUserLibrary();
      } else {
        this.clearLocal();
      }
    });
  }

	loadUserLibrary() {
    if (!this.auth.isLoggedIn()) return;

    this.http.get<number[]>(`${this.API}/favourites`)
      .subscribe(ids => this.favourites.set(ids));

    this.http.get<number[]>(`${this.API}/watchlist`)
      .subscribe(ids => this.watchList.set(ids));
  }

  clearLocal() {
    this.favourites.set([]);
    this.watchList.set([]);
  }

  addToFavourites(id: number) {
    if (!this.auth.isLoggedIn()) return;

    this.favourites.update(list =>
      list.includes(id) ? list : [...list, id]
    );

    this.http.post(`${this.API}/favourites/${id}`, {}).subscribe();
  }

  removeFromFavourites(id: number) {
    if (!this.auth.isLoggedIn()) return;

    this.favourites.update(list =>
      list.filter(x => x !== id)
    );

    this.http.delete(`${this.API}/favourites/${id}`).subscribe();
  }

  addToWatchList(id: number) {
    if (!this.auth.isLoggedIn()) return;

    this.watchList.update(list =>
      list.includes(id) ? list : [...list, id]
    );

    this.http.post(`${this.API}/watchlist/${id}`, {}).subscribe();
  }

  removeFromWatchList(id: number) {
    if (!this.auth.isLoggedIn()) return;

    this.watchList.update(list =>
      list.filter(x => x !== id)
    );

    this.http.delete(`${this.API}/watchlist/${id}`).subscribe();
  }
}
