import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tip-button',
  templateUrl: './tip-button.component.html',
  styleUrls: ['./tip-button.component.css']
})
export class TipButtonComponent {
  @Input() tipValue!: number;
  @Input() selectedValue!: number | null;

  @Output() selectValue = new EventEmitter<number>();

  selectedTipValue: number = 0;
  form = new FormGroup({});

  handleButtonClick() {
    this.selectValue.emit(this.tipValue);
  }

  isSelected(): boolean {
    if (!this.selectedValue) return false;

    return this.selectedValue === this.tipValue;
  }
}
