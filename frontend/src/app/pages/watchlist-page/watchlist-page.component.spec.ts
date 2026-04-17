import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistPageComponent } from './watchlist-page.component';

describe('WatchlistComponent', () => {
  let component: WatchlistPageComponent;
  let fixture: ComponentFixture<WatchlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
