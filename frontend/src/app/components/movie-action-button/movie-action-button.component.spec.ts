import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActionButtonComponent } from './movie-action-button.component';

describe('MovieActionButtonComponent', () => {
  let component: MovieActionButtonComponent;
  let fixture: ComponentFixture<MovieActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieActionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieActionButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
