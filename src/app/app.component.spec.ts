import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockComponent, MockRender } from 'ng-mocks';
import { TipButtonComponent } from './tip-button/tip-button.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [CurrencyPipe],
      declarations: [AppComponent, MockComponent(TipButtonComponent)]
    }).compileComponents();

    fixture = MockRender(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const populateTipCalculatorForm = (bill: string | null, tip: number | null, numberPeople: number | null) => {
    component.tipCalculatorForm.get('bill')?.patchValue(bill);
    component.tipCalculatorForm.get('tip')?.patchValue(tip);
    component.tipCalculatorForm.get('numberPeople')?.patchValue(numberPeople);
  };

  const getTipAmountAndTotal = () => {
    const tipAmount = component.calculateTipAmount();
    const total = component.calculateTotal();
    return { tipAmount, total };
  };

  const dispatchEventWithValue = (debugElement: DebugElement, value: string, eventType = 'input') => {
    debugElement.nativeElement.value = value;
    debugElement.nativeElement.dispatchEvent(new Event(eventType));
    fixture.detectChanges();
  };

  const typingOnCustomButton = (tipCustomButtonDE: DebugElement, value: number) => {
    tipCustomButtonDE.nativeElement.value = value;
    tipCustomButtonDE.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  const selectTipButton = (tipButtonDE: DebugElement, value: number) => {
    tipButtonDE.triggerEventHandler('selectValue', value);
    fixture.detectChanges();
  };

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
    populateTipCalculatorForm('', 15, 2);

    const billInput = fixture.debugElement.query(By.css('#bill'));
    dispatchEventWithValue(billInput, '150', 'blur');

    const { tipAmount, total } = getTipAmountAndTotal();
    const billValue = component.tipCalculatorForm.get('bill')?.value;

    fixture.detectChanges();
    expect(tipAmount).toBe(11.25);
    expect(billValue).toBe('150.00');
    expect(total).toBe(86.25);
  });

  it('should change value of tipAmount if value of bill is changed', async () => {
    populateTipCalculatorForm('', 15, 2);

    const billInput = fixture.debugElement.query(By.css('#bill'));

    dispatchEventWithValue(billInput, '150', 'blur');

    const billValue = component.tipCalculatorForm.get('bill')?.value;
    const tipAmountValue = component.tipAmount;
    const tipAmountValueUI = fixture.debugElement.query(By.css('#tipAmount'));

    expect(tipAmountValue).toBe(11.25);
    expect(billValue).toBe('150.00');
    expect(tipAmountValueUI.nativeElement.textContent).toBe('$11.25');
  });

  it('should change value of tip after typing on custom tip', () => {
    populateTipCalculatorForm('120.00', null, 2);

    const tipCustomInput = fixture.debugElement.query(By.css('#tipCustom'));

    dispatchEventWithValue(tipCustomInput, '7');

    const { tipAmount, total } = getTipAmountAndTotal();

    expect(tipAmount).toBe(4.2);
    expect(total).toBe(64.2);
  });

  it('should show error message if number of people is zero', function () {
    populateTipCalculatorForm('120.00', 10, null);

    const numberPeopleInput = fixture.debugElement.query(By.css('#numberPeople'));

    dispatchEventWithValue(numberPeopleInput, '0');

    const { tipAmount, total } = getTipAmountAndTotal();
    const errorMessage = fixture.debugElement.query(By.css('#numberPeople__errorMessage'));

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toBe("Can't be zero!");
    expect(tipAmount).toBe(0);
    expect(total).toBe(0);
  });

  it('should show error message if number of people is negative', function () {
    populateTipCalculatorForm('120.00', 10, null);

    const numberPeopleInput = fixture.debugElement.query(By.css('#numberPeople'));

    dispatchEventWithValue(numberPeopleInput, '-2');

    const { tipAmount, total } = getTipAmountAndTotal();
    const errorMessage = fixture.debugElement.query(By.css('#numberPeople__errorMessage'));

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toBe("Can't be zero!");
    expect(tipAmount).toBe(0);
    expect(total).toBe(0);
  });

  it('should show error message if custom tip is negative', function () {
    populateTipCalculatorForm('120.00', null, 2);

    const tipCustomInput = fixture.debugElement.query(By.css('#tipCustom'));

    dispatchEventWithValue(tipCustomInput, '-2');

    const { tipAmount, total } = getTipAmountAndTotal();
    const errorMessage = fixture.debugElement.query(By.css('#tipCustom__errorMessage'));

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toBe("Can't be negative!");
    expect(tipAmount).toBe(0);
    expect(total).toBe(0);
  });

  it('should not show error message if custom tip is zero', function () {
    populateTipCalculatorForm('120.00', null, 2);

    const tipCustomInput = fixture.debugElement.query(By.css('#tipCustom'));

    dispatchEventWithValue(tipCustomInput, '0');

    const { tipAmount, total } = getTipAmountAndTotal();
    const errorMessage = fixture.debugElement.query(By.css('#tipCustom__errorMessage'));

    expect(errorMessage).toBeFalsy();
    expect(tipAmount).toBe(0);
    expect(total).toBe(60);
  });

  it('should show error message if bill is zero', function () {
    populateTipCalculatorForm(null, 15, 2);

    const billInput = fixture.debugElement.query(By.css('#bill'));

    dispatchEventWithValue(billInput, '0');

    const { tipAmount, total } = getTipAmountAndTotal();
    const errorMessage = fixture.debugElement.query(By.css('#bill__errorMessage'));

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toBe("Can't be zero or negative!");
    expect(tipAmount).toBe(0);
    expect(total).toBe(0);
  });

  it('should show error message if bill is negative', function () {
    populateTipCalculatorForm(null, 15, 2);

    const billInput = fixture.debugElement.query(By.css('#bill'));

    dispatchEventWithValue(billInput, '-2');

    const { tipAmount, total } = getTipAmountAndTotal();
    const errorMessage = fixture.debugElement.query(By.css('#bill__errorMessage'));

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toBe("Can't be zero or negative!");
    expect(tipAmount).toBe(0);
    expect(total).toBe(0);
  });

  it('should remove letters from bill input after blur', function () {
    populateTipCalculatorForm(null, 15, 2);

    const billInput = fixture.debugElement.query(By.css('#bill'));

    dispatchEventWithValue(billInput, '25jsdj.00');

    const { tipAmount, total } = getTipAmountAndTotal();
    const errorMessage = fixture.debugElement.query(By.css('#bill__errorMessage'));

    expect(errorMessage).toBeFalsy();
    expect(tipAmount).toBe(0);
    expect(total).toBe(0);
  });

  it('should render five tip-buttons', function () {
    let debugElements = fixture.debugElement.queryAll(By.css('app-tip-button'));
    let tipValues = debugElements.map((e) => e.componentInstance.tipValue);

    expect(tipValues).toEqual([5, 10, 15, 25, 50]);
  });

  it('should change value of tip on form after click on tip-button', function () {
    const debugElements = fixture.debugElement.queryAll(By.css('app-tip-button'));
    selectTipButton(debugElements[0], 5);
    expect(component.tipCalculatorForm.get('tip')?.value).toBe(5);
  });

  it('should change value of tip after click on two different tip-buttons', function () {
    const debugElements = fixture.debugElement.queryAll(By.css('app-tip-button'));
    selectTipButton(debugElements[0], 5);
    expect(component.tipCalculatorForm.get('tip')?.value).toBe(5);

    selectTipButton(debugElements[1], 10);
    expect(component.tipCalculatorForm.get('tip')?.value).toBe(10);
  });

  it('should change value of tip after use custom tip', function () {
    const tipCustomButtonDE = fixture.debugElement.query(By.css('#tipCustom'));
    typingOnCustomButton(tipCustomButtonDE, 30);
    expect(component.tipCalculatorForm.get('tip')?.value).toBe(30);
  });

  it('should change value of tip correctly when select button after use custom tip', function () {
    const debugElements = fixture.debugElement.queryAll(By.css('app-tip-button'));
    selectTipButton(debugElements[0], 5);
    expect(component.tipCalculatorForm.get('tip')?.value).toBe(5);

    const tipCustomButtonDE = fixture.debugElement.query(By.css('#tipCustom'));
    typingOnCustomButton(tipCustomButtonDE, 30);
    expect(component.tipCalculatorForm.get('tip')?.value).toBe(30);
  });

  it('should reset values after click on reset button', function () {
    component.tipCalculatorForm.patchValue({
      tip: 7,
      bill: '120.00',
      numberPeople: 2
    });

    let result = getTipAmountAndTotal();
    expect(result.tipAmount).toBe(4.2);
    expect(result.total).toBe(64.2);

    const resetButtonDE = fixture.debugElement.query(By.css('#resetButton'));
    resetButtonDE.triggerEventHandler('click', null);
    fixture.detectChanges();

    result = getTipAmountAndTotal();
    expect(result.tipAmount).toBe(0);
    expect(result.total).toBe(0);

    expect(component.tipCalculatorForm.getRawValue()).toEqual({
      tip: null,
      bill: null,
      numberPeople: null
    });
  });
});
