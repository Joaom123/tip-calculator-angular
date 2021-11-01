import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tip-button',
  templateUrl: './tip-button.component.html',
  styleUrls: ['./tip-button.component.css']
})
export class TipButtonComponent implements OnInit {
  @Input() tipValue: number  = 0;
  @Input() parentForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}