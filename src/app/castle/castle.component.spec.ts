import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastleComponent } from './castle.component';
import { MaterialModule } from '../shared/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

describe('CastleComponent', () => {
  let component: CastleComponent;
  let fixture: ComponentFixture<CastleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
      declarations: [ CastleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
