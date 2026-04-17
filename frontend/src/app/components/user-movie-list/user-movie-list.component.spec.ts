import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovieListComponent } from './user-movie-list.component';

describe('UserMovieListComponent', () => {
  let component: UserMovieListComponent;
  let fixture: ComponentFixture<UserMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMovieListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMovieListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
