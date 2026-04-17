import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-action-button',
  imports: [ CommonModule ],
  templateUrl: './movie-action-button.component.html',
  styleUrl: './movie-action-button.component.scss',
})
export class MovieActionButtonComponent {

  @Input() label!: string;
  @Input() active = false;
  @Input() activeColor: string = 'green-600';
  @Input() inactiveColor = 'gray-400';
  @Input() inactivePath!: string;
  @Input() activePath!: string; 
  @Input() pillBackgroundInactive: string = '';
  @Input() pillBackgroundActive: string = '';
  @Input() hoverClassInactive = '';
  @Input() hoverClassActive = '';

  @Output() clicked = new EventEmitter<void>();

  onClick(event: Event) {
    event.stopPropagation();
    this.clicked.emit();
  }
}
