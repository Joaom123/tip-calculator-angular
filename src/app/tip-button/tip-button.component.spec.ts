import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipButtonComponent } from './tip-button.component';

describe('TipButtonComponent', () => {
  let component: TipButtonComponent;
  let fixture: ComponentFixture<TipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
