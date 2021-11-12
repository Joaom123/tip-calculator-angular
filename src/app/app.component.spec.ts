import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import {TipButtonComponent} from "./tip-button/tip-button.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [CurrencyPipe],
      declarations: [
        AppComponent,
        TipButtonComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const title = fixture.nativeElement.querySelector("#title");

    expect(title?.textContent).toEqual("S P L IT T E R");
  });

  it('should calculateTipAmount', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.calculateTipAmount()).toEqual(0);
  });

  //test reset button

});
