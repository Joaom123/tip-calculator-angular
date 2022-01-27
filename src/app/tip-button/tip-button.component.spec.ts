import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipButtonComponent } from './tip-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

describe('TipButtonComponent', () => {
  let component: TipButtonComponent;
  let fixture: ComponentFixture<TipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TipButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TipButtonComponent);
    component = fixture.componentInstance;
    component.tipValue = 15;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('label content should be equals tipValue%', () => {
    let labelElement = fixture.debugElement.query(By.css('label'));

    expect(labelElement.nativeElement.textContent).toBe('15%');
  });

  it('should change label content if tip value change', function () {
    component.tipValue = 20;
    fixture.detectChanges();

    let labelElement = fixture.debugElement.query(By.css('label'));

    expect(labelElement.nativeElement.textContent).toBe('20%');
  });

  it('should have tipButton--checked if selectedValue is equal to tipValue', function () {
    component.tipValue = 20;
    component.selectedValue = 20;
    fixture.detectChanges();
    let divElement = fixture.debugElement.query(By.css('.tipButton--checked'));

    expect(divElement).toBeTruthy();
  });

  it('should not have tipButton--checked if tip on form is different to tipValue', function () {
    component.tipValue = 15;
    component.selectedValue = 5;
    fixture.detectChanges();
    let divElement = fixture.debugElement.query(By.css('.tipButton--checked'));

    expect(divElement).toBeFalsy();
  });

  it('should raise selected event when clicked', function () {
    component.tipValue = 25;

    spyOn(component.selectValue, 'emit'); // spy on event emitter

    const button = fixture.nativeElement.querySelector('div');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.selectValue.emit).toHaveBeenCalledWith(25);
  });
});
