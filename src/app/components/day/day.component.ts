import { Component, Input } from '@angular/core';
import { Forecast } from '../../models/city';

@Component({
  selector: 'day',
  templateUrl: './day.html'
})
export class DayComponent {

  @Input() day: Forecast;

  constructor() {}

}
