import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipButtonComponent } from './tip-button.component';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

describe('TipButtonComponent', () => {
  let component: TipButtonComponent;
  let fixture: ComponentFixture<TipButtonComponent>;

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
    component.selectedTipValue = 15;
    component.parentForm = new FormGroup({
      tip: new FormControl(15)
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
