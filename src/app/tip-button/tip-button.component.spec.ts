import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipButtonComponent } from './tip-button.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('TipButtonComponent', () => {
  let component: TipButtonComponent;
  let fixture: ComponentFixture<TipButtonComponent>;
  let tipButtonDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TipButtonComponent
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipButtonComponent);
    component = fixture.componentInstance;
    tipButtonDebugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input value should be equals tipValue', () => {
    let inputElement: DebugElement = tipButtonDebugElement.query(By.css('input'));
    expect(inputElement.nativeElement.id).toBe('tip0');
  });

  it('label content should be equals tipValue%', () => {
    let labelElement: DebugElement = tipButtonDebugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toBe('0%');
  });
});
