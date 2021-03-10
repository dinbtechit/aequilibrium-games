import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformerStatsComponent } from './transformer-stats.component';

describe('TransformerStatsComponent', () => {
  let component: TransformerStatsComponent;
  let fixture: ComponentFixture<TransformerStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformerStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
