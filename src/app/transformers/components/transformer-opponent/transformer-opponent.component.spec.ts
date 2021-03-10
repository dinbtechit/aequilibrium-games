import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformerOpponentComponent } from './transformer-opponent.component';

describe('TransformerOpponentComponent', () => {
  let component: TransformerOpponentComponent;
  let fixture: ComponentFixture<TransformerOpponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformerOpponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformerOpponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
