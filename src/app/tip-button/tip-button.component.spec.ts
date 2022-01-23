import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipButtonComponent } from './tip-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TipButtonComponent', () => {
  let component: TipButtonComponent;
  let fixture: ComponentFixture<TipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TipButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TipButtonComponent);
    component = fixture.componentInstance;
    component.tipValue = 15;
    component.parentForm = new FormGroup({
      tip: new FormControl(15)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('label content should be equals tipValue%', () => {
    let labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toBe('15%');
  });

  it('should change label content if tip value change', function () {
    component.tipValue = 20;
    fixture.detectChanges();

    let labelElement = fixture.debugElement.query(By.css('label'));

    expect(labelElement.nativeElement.textContent).toBe('20%');
  });

  it('should have tipButton--checked if tip on form is equal to tipValue of the component', function () {
    component.tipValue = 20;
    component.parentForm.controls['tip'].setValue(20);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let divElement = fixture.debugElement.query(By.css('.tipButton--checked'));
      expect(divElement).toBeTruthy();
    });
  });

  it('should not have tipButton--checked if tip on form is different to tipValue of the component', function () {
    component.tipValue = 15;
    component.parentForm.controls['tip'].setValue(20);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let divElement = fixture.debugElement.query(By.css('.tipButton--checked'));
      expect(divElement).toBeFalsy();
    });
  });
});
