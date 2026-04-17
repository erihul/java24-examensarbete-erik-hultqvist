import { Component, computed, EventEmitter, inject, Input, Output, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../services/movie.service';

interface CreditsViewModel {
  director?: string;
  actors: string;
}

@Component({
  selector: 'app-user-movie-list',
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: './user-movie-list.component.html',
  styleUrl: './user-movie-list.component.scss',
})
export class UserMovieListComponent {
	private movieService = inject(MovieService);

	@Input({ required: true }) title!: string;
	@Input() icon: 'heart' | 'bookmark' | 'star' = 'heart';
	@Input() colorClass = 'text-red-500';

	@Input({ required: true }) movies: Movie[] = [];
	@Input() emptyText = 'No movies yet.';

	@Output() remove = new EventEmitter<number>();

	hoveringX: number | null = null;

	creditsMap = signal<Record<number, CreditsViewModel>>({});

	ngOnChanges() {
		this.movies.forEach(movie => {
			this.loadCredits(movie.id);
		});
	}

	loadCredits(movieId: number) {
		if (this.creditsMap()[movieId]) return;

		this.movieService.getMovieCredits(movieId).subscribe(({ director, actors }) => {
			this.creditsMap.update(current => ({
			...current,
			[movieId]: {
				director: director?.name,
				actors: actors.map(a => a.name).join(', '),
			},
			}));
		});
	}

	onRemove(movieId: number, event: Event) {
		event.stopPropagation();
		this.remove.emit(movieId);
	}
}