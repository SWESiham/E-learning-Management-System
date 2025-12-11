import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity-card',
  standalone: false,
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.css',
})
export class ActivityCard {

  @Input()number:Number=7;
  @Input()title:string='Total Users'

}
