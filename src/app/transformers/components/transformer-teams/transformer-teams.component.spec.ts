import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformerTeamsComponent } from './transformer-teams.component';

describe('TransformerTeamsComponent', () => {
  let component: TransformerTeamsComponent;
  let fixture: ComponentFixture<TransformerTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformerTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformerTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
