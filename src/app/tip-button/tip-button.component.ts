import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tip-button',
  templateUrl: './tip-button.component.html',
  styleUrls: ['./tip-button.component.css']
})
export class TipButtonComponent implements OnInit {
  @Input() tipValue: number = 0;
  @Input() parentForm: FormGroup = new FormGroup({
    tip: new FormControl(0)
  });
  selectedTipValue: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.parentForm.get('tip')?.valueChanges.subscribe(() => {
      this.selectedTipValue = this.parentForm.getRawValue().tip;
    });
  }

}
