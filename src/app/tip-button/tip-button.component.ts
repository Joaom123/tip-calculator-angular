import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tip-button',
  templateUrl: './tip-button.component.html',
  styleUrls: ['./tip-button.component.css']
})
export class TipButtonComponent {
  isSelected: boolean = false;

  @Input() tipValue!: number;
  @Input() set selectedValue(value: number) {
    this.isSelected = value === this.tipValue;
  }

  @Output() selectValue = new EventEmitter<number>();

  selectedTipValue: number = 0;
  form = new FormGroup({});

  handleButtonClick() {
    this.selectValue.emit(this.tipValue);
  }
}
