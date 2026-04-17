import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularMoviePageComponent } from './popular-movie-page.component';

describe('PopularMoviePageComponent', () => {
  let component: PopularMoviePageComponent;
  let fixture: ComponentFixture<PopularMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularMoviePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularMoviePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
