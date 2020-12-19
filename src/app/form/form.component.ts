import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plate } from 'src/app/models/plateForm.model';
import { day } from '../enums/day.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor() { }


  isValid(numberToCheck: number, dayWeek: number): boolean {
    switch (numberToCheck) {
      case 1 - 2:
        return (dayWeek === day.monday);
        break;
      case 3 - 4:
        return (dayWeek === day.tuesday);
        break;
      case 5 - 6:
        return (dayWeek === day.wednesday);
        break;
      case 7 - 8:
        return (dayWeek === day.thursday);
        break;
      default: {
        return (dayWeek === day.friday);
        break;
       }
    }
  }

  returnLastChar(stringToTrim: string): number {
    const getLastChar = +stringToTrim.charAt(stringToTrim.length - 1);
    return getLastChar;
  }

  isHourAllowed(hour: number): boolean {
    return ((hour > 7 && hour < 9.30) || (hour > 16 && hour < 17.30));
  }

  plateAction(formData: NgForm): void {
    if (formData.valid) {
      const plateForm: Plate = {
        plate: formData.value.plate,
        date: formData.value.date,
        hour: formData.value.hour
      };
      const lastNumber = this.returnLastChar(plateForm.plate);
      const date = new Date(plateForm.date);
      const getDay = 1 + date.getDay();
      if (this.isHourAllowed(+plateForm.hour)){
        this.isValid(lastNumber, getDay) ? alert('Can be circulated') : alert('Can not circulate');
      } else {
        alert('Can be circulate');
      }
    }
  }

}
