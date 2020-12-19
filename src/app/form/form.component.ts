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

  isOnSchedule(hourToCheck: string): boolean {
    const h = moment(hourToCheck, 'h:mm');
    return ((h.isAfter(moment('6:59', 'h:mm')) && h.isBefore(moment('9:31', 'h:mm'))) ||
      (h.isAfter(moment('15:59', 'h:mm')) && h.isBefore(moment('17:31', 'h:mm'))));
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
      if (this.isOnSchedule(plateForm.hour.toString()) && !this.isDayAllowed(dayWeek)){
        this.isValid(lastNumber, dayWeek) ? alert('Can be circulated') : alert('Can not circulate');
      } else {
        alert('Can be circulate');
      }
    }
  }

}
