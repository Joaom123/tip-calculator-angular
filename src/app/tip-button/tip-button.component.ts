import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tip-button',
  templateUrl: './tip-button.component.html',
  styleUrls: ['./tip-button.component.css']
})
export class TipButtonComponent implements OnInit {
  @Input() tipValue: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
