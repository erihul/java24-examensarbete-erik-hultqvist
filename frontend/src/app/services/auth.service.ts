import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  email: string;
  username: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/api/auth';
	private messageService = inject(MessageService);

  currentUser = signal<AuthResponse | null>(this.loadUserFromStorage());

  isLoggedIn = computed(() => !!this.currentUser());

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, credentials).pipe(
      tap(response => this.saveSession(response))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/register`, data).pipe(
      tap(response => this.saveSession(response))
    );
  }

  logout(): void {
    this.clearSession();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

	refreshToken(): Observable<AuthResponse> {
		const refreshToken = localStorage.getItem('refreshToken');

		return this.http.post<AuthResponse>(`${this.API}/refresh`, { refreshToken }).pipe(
			tap(response => this.saveSession(response))
		);
	}

  private saveSession(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response));

    this.currentUser.set(response);
  }

  private clearSession(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    this.currentUser.set(null);
  }

  private loadUserFromStorage(): AuthResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  saveOAuthSession(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.http.get<AuthResponse>('http://localhost:8080/api/users/me')
      .subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);

				this.messageService.add({
					severity: 'success',
					summary: 'Welcome back!',
					detail: `Signed in as ${user.email}`,
					life: 3000,
				});
      });
  }
}