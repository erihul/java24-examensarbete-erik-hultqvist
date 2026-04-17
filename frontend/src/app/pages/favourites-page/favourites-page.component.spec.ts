import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesPageComponent } from './favourites-page.component';

describe('FavouritesComponent', () => {
  let component: FavouritesPageComponent;
  let fixture: ComponentFixture<FavouritesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
