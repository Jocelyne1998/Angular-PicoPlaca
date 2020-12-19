import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormComponent } from './form.component';
import { day } from '../enums/day.enum';
import { FormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, FormsModule],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Test for hour', () => {
  const component = new FormComponent();
  const hours = new Date();
  hours.setHours(8);
  it('should return a true because 8:00 AM is inside the PicoPlaca time', () => {
    expect(component.isOnSchedule(hours)).toEqual(true);
  });
});

describe('Test for day is valid which corresponding to the last day of the licence plate number', () => {
  const component = new FormComponent();
  it('should return a true because the last number the license plate is 8 and day is thursday which corresponds to an allowed day', () => {
    expect(component.isValid(8, day.thursday)).toEqual(true);
  });
  it('should return a true because the last number the license plate is 1 and day is monday which corresponds to an allowed day', () => {
    expect(component.isValid(1, day.monday)).toEqual(true);
  });
  it('should return a false because the last number the license plate is 5 and day is friday not corresponds to an allowed day', () => {
    expect(component.isValid(5, day.friday)).toEqual(false);
  });
  it('should return a false because the last number the license plate is 0 and day is tuesday not corresponds to an allowed day', () => {
    expect(component.isValid(5, day.tuesday)).toEqual(false);
  });
});
