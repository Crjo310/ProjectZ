import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFreestyleComponent } from './game-freestyle.component';

describe('GameFreestyleComponent', () => {
  let component: GameFreestyleComponent;
  let fixture: ComponentFixture<GameFreestyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFreestyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFreestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
