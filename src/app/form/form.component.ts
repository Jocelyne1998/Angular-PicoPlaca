import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plate } from 'src/app/models/plateForm.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor() { }

  plateAction(formData: NgForm): void {
    if (formData.valid) {
      const plateForm: Plate = {
        plate: formData.value.plate,
        date: formData.value.date,
        hour: formData.value.hour
      };
      console.log(plateForm);
    }
  }

}
