import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipButtonComponent } from './tip-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TipButtonComponent', () => {
  let component: TipButtonComponent;
  let fixture: ComponentFixture<TipButtonComponent>;
  let tipButtonDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TipButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipButtonComponent);
    component = fixture.componentInstance;
    component.tipValue = 15;
    component.parentForm = new FormGroup({
      tip: new FormControl(15)
    });
    tipButtonDebugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input id should be equals tipValue', () => {
    let inputElement: DebugElement = tipButtonDebugElement.query(By.css('input'));
    expect(inputElement.nativeElement.id).toBe('tip15');
  });

  it('label content should be equals tipValue%', () => {
    let labelElement: DebugElement = tipButtonDebugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toBe('15%');
  });
});
