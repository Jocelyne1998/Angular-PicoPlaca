import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plate } from 'src/app/models/plateForm.model';
import { day } from '../enums/day.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor() { }


  isValid(plateLastNumber: number, dayWeek: number): boolean {
    switch (plateLastNumber) {
      case 1:
      case 2:
        return (dayWeek === day.monday);
      case 3:
      case 4:
        return (dayWeek === day.tuesday);
      case 5:
      case 6:
        return (dayWeek === day.wednesday);
      case 7:
      case 8:
        return (dayWeek === day.thursday);
      case 9:
      case 0:
        return (dayWeek === day.friday);
      default: {
        return false;
      }
    }
  }

  returnLastChar(stringToTrim: string): number {
    const getLastChar = +stringToTrim.charAt(stringToTrim.length - 1);
    return getLastChar;
  }

  isOnSchedule(hour: Date): boolean {
    const hours7 = new Date();
    hours7.setHours(7, 0);
    const hours9 = new Date();
    hours9.setHours(9, 30);
    const hours16 = new Date();
    hours16.setHours(16, 0);
    const hours17 = new Date();
    hours17.setHours(17, 30);
    return ((hour >= hours7 && hour <= hours9) || (hour >= hours16 && hour <= hours17));
  }

  isDayAllowed(dayWeek: number): boolean {
    return (dayWeek === day.saturday || dayWeek === day.sunday);
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
      const dayWeek = 1 + (+date.getDay());
      const hour1 = moment('8:45', 'h:mm');
      const hour2 = moment(plateForm.hour, 'h:mm');
      console.log(hour1.isBefore(hour2)); // deberá aparecer true
      if (this.isOnSchedule(plateForm.hour) && !this.isDayAllowed(dayWeek)){
        this.isValid(lastNumber, dayWeek) ? alert('Can be circulated') : alert('Can not circulate');
      } else {
        alert('Can be circulate');
      }
    }
  }

}
