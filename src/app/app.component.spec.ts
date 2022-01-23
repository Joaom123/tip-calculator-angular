import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { TipButtonComponent } from './tip-button/tip-button.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [CurrencyPipe],
      declarations: [AppComponent, TipButtonComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const title = fixture.nativeElement.querySelector('#title');

    expect(title?.textContent).toEqual('S P L IT T E R');
  });

  it('initial value of number of people should be ""', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const tipCalculatorForm = app.tipCalculatorForm;
    const numberOfPeopleValue = tipCalculatorForm.get('numberPeople')?.value;

    expect(numberOfPeopleValue).toBe('');
  });

  it('initial value of tip should be ""', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const tipCalculatorForm = app.tipCalculatorForm;
    const tipValue = tipCalculatorForm.get('tip')?.value;

    expect(tipValue).toBe('');
  });

  it('should calculateTipAmount', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const tipAmount = app.calculateTipAmount();

    expect(tipAmount).toEqual(0);
  });

  it('should calculate tip amount and total correctly when value of bill is changed', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const billInput = fixture.debugElement.query(By.css('#bill'));
      const billInputElement = billInput.nativeElement;

      billInputElement.value = '150';
      billInputElement.dispatchEvent(new Event('input'));

      const app = fixture.componentInstance;
      const tipAmount = app.calculateTipAmount();
      const total = app.calculateTotal();
      const billValue = app.tipCalculatorForm.get('bill')?.value;

      expect(tipAmount).toBe(11.25);
      expect(billValue).toBe('150');
      expect(total).toBe(86.25);
    });
  });

  it('should change value of tipAmount if value of bill is changed', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const billInput = fixture.debugElement.query(By.css('#bill'));
      const billInputElement = billInput.nativeElement;

      billInputElement.value = '150';
      billInputElement.dispatchEvent(new Event('input'));

      const app = fixture.componentInstance;
      const billValue = app.tipCalculatorForm.get('bill')?.value;
      const tipAmountValue = app.tipAmount;
      const tipAmountValueUI = fixture.debugElement.query(By.css('#tipAmount'));
      fixture.detectChanges();

      expect(tipAmountValue).toBe(11.25);
      expect(billValue).toBe('150');
      expect(tipAmountValueUI.nativeElement.textContent).toBe('$11.25');
    });
  });
});
