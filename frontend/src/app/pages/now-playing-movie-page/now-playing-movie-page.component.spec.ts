import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowPlayingMoviePageComponent } from './now-playing-movie-page.component';

describe('NowPlayingMoviePageComponent', () => {
  let component: NowPlayingMoviePageComponent;
  let fixture: ComponentFixture<NowPlayingMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NowPlayingMoviePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowPlayingMoviePageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
