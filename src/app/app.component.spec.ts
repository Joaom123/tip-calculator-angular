import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TipButtonComponent } from './tip-button/tip-button.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [CurrencyPipe],
      declarations: [AppComponent, TipButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title svg', () => {
    const logoSrc = fixture.debugElement.nativeElement.querySelector('.logo').src;

    expect(logoSrc).toContain('/images/logo.svg');
  });

  it('initial value of number of people should be ""', () => {
    const numberOfPeopleValue = component.tipCalculatorForm.get('numberPeople')?.value;

    expect(numberOfPeopleValue).toBe('');
  });

  it('initial value of tip should be ""', () => {
    const tipValue = component.tipCalculatorForm.get('tip')?.value;

    expect(tipValue).toBe('');
  });

  it('should calculateTipAmount', () => {
    const tipAmount = component.calculateTipAmount();

    expect(tipAmount).toEqual(0);
  });

  it('should calculate tip amount and total correctly when value of bill is changed', async () => {
    component.tipCalculatorForm.get('tip')?.patchValue(15);
    component.tipCalculatorForm.get('numberPeople')?.patchValue(2);

    const billInput = fixture.debugElement.query(By.css('#bill'));

    billInput.nativeElement.value = '150';
    billInput.nativeElement.dispatchEvent(new Event('blur'));

    const tipAmount = component.calculateTipAmount();
    const total = component.calculateTotal();
    const billValue = component.tipCalculatorForm.get('bill')?.value;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(tipAmount).toBe(11.25);
      expect(billValue).toBe('150.00');
      expect(total).toBe(86.25);
    });
  });

  it('should change value of tipAmount if value of bill is changed', async () => {
    component.tipCalculatorForm.get('tip')?.patchValue(15);
    component.tipCalculatorForm.get('numberPeople')?.patchValue(2);

    const billInput = fixture.debugElement.query(By.css('#bill'));
    const billInputElement = billInput.nativeElement;

    billInputElement.value = '150';
    billInputElement.dispatchEvent(new Event('input'));

    const billValue = component.tipCalculatorForm.get('bill')?.value;
    const tipAmountValue = component.tipAmount;
    const tipAmountValueUI = fixture.debugElement.query(By.css('#tipAmount'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(tipAmountValue).toBe(11.25);
      expect(billValue).toBe('150');
      expect(tipAmountValueUI.nativeElement.textContent).toBe('$11.25');
    });
  });
});
