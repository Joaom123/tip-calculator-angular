import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Todo: change to currency
  bill: number = 0;
  tip: number = 15;
  numberPeople: number = 0;
  tipAmount: number = this.calculateTipAmount();
  total: number = this.calculateTotal();

  tipCalculatorForm: FormGroup = this.formBuilder.group({
    bill: new FormControl(this.bill),
    tip: new FormControl(this.tip),
    numberPeople: new FormControl(this.numberPeople)
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.tipCalculatorForm.valueChanges.subscribe(selectedValue => {
      this.tip = this.tipCalculatorForm.get('tip')?.value;
      this.bill = this.tipCalculatorForm.get('bill')?.value;
      this.numberPeople = this.tipCalculatorForm.get('numberPeople')?.value;
      this.updateTipAmountAndTotal();
    });
  }

  calculateTipAmount(): number {
    if(this.numberPeople === 0)
      return 0;

    return (this.bill * this.tip) / (this.numberPeople * 100);
  }

  calculateTotal(): number {
    if(this.numberPeople === 0)
      return 0;

    return (this.bill / this.numberPeople) + this.calculateTipAmount();
  }

  updateTipAmountAndTotal(): void {
    this.tipAmount = this.calculateTipAmount();
    this.total = this.calculateTotal();
  }

  reset(): void {
    this.tipCalculatorForm.setValue({
      tip: 15,
      bill: 0,
      numberPeople: 0
    });
  }

}
