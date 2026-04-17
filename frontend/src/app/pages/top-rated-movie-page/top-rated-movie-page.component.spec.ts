import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedMoviePageComponent } from './top-rated-movie-page.component';

describe('TopRatedMoviePageComponent', () => {
  let component: TopRatedMoviePageComponent;
  let fixture: ComponentFixture<TopRatedMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRatedMoviePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRatedMoviePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
