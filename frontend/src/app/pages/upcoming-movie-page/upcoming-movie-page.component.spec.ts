import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMoviePageComponent } from './upcoming-movie-page.component';

describe('UpcomingMoviePageComponent', () => {
  let component: UpcomingMoviePageComponent;
  let fixture: ComponentFixture<UpcomingMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingMoviePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingMoviePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
