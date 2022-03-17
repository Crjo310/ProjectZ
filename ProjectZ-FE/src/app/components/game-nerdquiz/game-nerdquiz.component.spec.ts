import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNerdquizComponent } from './game-nerdquiz.component';

describe('GameNerdquizComponent', () => {
  let component: GameNerdquizComponent;
  let fixture: ComponentFixture<GameNerdquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameNerdquizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameNerdquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
