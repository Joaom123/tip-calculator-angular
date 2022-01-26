import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tipCalculatorForm = this.formBuilder.group({
    bill: ['', Validators.min(0.01)],
    tip: ['', Validators.min(0)],
    numberPeople: ['', Validators.min(1)]
  });

  tipAmount: number = this.calculateTipAmount();
  total: number = this.calculateTotal();

  constructor(private formBuilder: FormBuilder, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.tipCalculatorForm.valueChanges.subscribe(() => {
      this.updateTipAmountAndTotal();
    });
  }

  updateTipAmountAndTotal(): void {
    this.tipAmount = this.calculateTipAmount();
    this.total = this.calculateTotal();
  }

  calculateTipAmount(): number {
    const { bill, numberPeople, tip } = this.getFormValues();

    if (!numberPeople || !bill || !tip) return 0;

    if (numberPeople < 0 || bill < 0 || tip < 0) return 0;

    return (bill * tip) / (numberPeople * 100);
  }

  calculateTotal(): number {
    const { bill, numberPeople, tip } = this.getFormValues();

    if (!numberPeople || !bill) return 0;

    if (numberPeople < 0 || bill < 0 || tip < 0) return 0;

    return bill / numberPeople + this.calculateTipAmount();
  }

  private getFormValues() {
    const bill = this.getBillValue();
    const numberPeople = this.tipCalculatorForm.get('numberPeople')?.value;
    const tip = +this.tipCalculatorForm.get('tip')?.value;
    return { bill, numberPeople, tip };
  }

  getBillValue() {
    let billValue: string = this.tipCalculatorForm.get('bill')?.value;

    if (!billValue) return 0;

    return +billValue.replace(/,/g, '');
  }

  reset(): void {
    this.tipCalculatorForm.reset();
  }

  transformAmount(element: any) {
    let value: string = element.target.value;
    value = value.replace(/[^0-9.,]/g, '');
    const formattedAmount = this.currencyPipe.transform(value, '$', '', '1.2-2', 'en-US');

    this.tipCalculatorForm.get('bill')?.patchValue(formattedAmount);
  }

  handleClickTipButton($event: any) {
    this.tipCalculatorForm.get('tip')?.patchValue($event);
  }
}
