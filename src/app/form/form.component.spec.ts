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

});

describe('Test for hour', () => {
  const component = new FormComponent();
  it('should return a false because 20:00 PM is not inside the PicoPlaca time', () => {
    expect(component.isOnSchedule('20:00')).toEqual(false);
  });
  it('should return a true because 8:00 AM is inside the PicoPlaca time', () => {
    expect(component.isOnSchedule('8:00')).toEqual(true);
  });
  it('should return a false because 5:00 AM is not inside the PicoPlaca time', () => {
    expect(component.isOnSchedule('5:00')).toEqual(false);
  });
  it('should return a true because 16:00 PM is inside the PicoPlaca time', () => {
    expect(component.isOnSchedule('16:00')).toEqual(true);
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

describe('Test for return the last char of the string', () => {
  const component = new FormComponent();
  it('should return a 3 because the last number the license plate is 3', () => {
    expect(component.returnLastChar('AAC-0123')).toEqual(3);
  });
  it('should return a 9 because the last number the license plate is 9', () => {
    expect(component.returnLastChar('WLU-94-69')).toEqual(9);
  });
});

describe('Test to know if it is the weekend', () => {
  const component = new FormComponent();
  it('should return a True because sunday is weekend', () => {
    expect(component.isDayAllowed(day.sunday)).toEqual(true);
  });
  it('should return a True because saturday is weekend', () => {
    expect(component.isDayAllowed(day.saturday)).toEqual(true);
  });
  it('should return a False because thursday is not weekend', () => {
    expect(component.isDayAllowed(day.thursday)).toEqual(false);
  });
});
