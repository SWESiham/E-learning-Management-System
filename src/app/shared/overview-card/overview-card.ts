import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-card',
  standalone: false,
  templateUrl: './overview-card.html',
  styleUrl: './overview-card.css',
})
export class OverviewCard {
@Input() courseName:string='';
@Input() instructorName:string='';
@Input() enrolledstudents:number=0;



}
