import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tipCalculatorForm: FormGroup = this.formBuilder.group({
    bill: [''],
    tip: [''],
    numberPeople: ['']
  });

  formattedAmount: any = '';
  amount: any = '';
  tipAmount: number = this.calculateTipAmount();
  total: number = this.calculateTotal();

  constructor(
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.reset();
    this.tipCalculatorForm.valueChanges.subscribe(selectedValue => {
      this.updateTipAmountAndTotal();
    });
  }

  calculateTipAmount(): number {
    const bill = +this.tipCalculatorForm.get('bill')?.value;
    const numberPeople = this.tipCalculatorForm.get('numberPeople')?.value;
    const tip = this.tipCalculatorForm.get('tip')?.value;

    if (!numberPeople || !bill || !tip)
      return 0;

    return (bill * tip) / (numberPeople * 100);
  }

  calculateTotal(): number {
    const bill = this.tipCalculatorForm.get('bill')?.value;
    const numberPeople = this.tipCalculatorForm.get('numberPeople')?.value;

    if (numberPeople === 0)
      return 0;

    return (bill / numberPeople) + this.calculateTipAmount();
  }

  updateTipAmountAndTotal(): void {
    this.tipAmount = this.calculateTipAmount();
    this.total = this.calculateTotal();
  }

  reset(): void {
    this.tipCalculatorForm.setValue({
      bill: 0,
      tip: 15,
      numberPeople: 0
    });
  }

  transformAmount(element: any) {
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '$', '', '1.2-2', 'en-US');
    element.target.value = +this.formattedAmount;
  }
}
