import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from '../modules/home/components/footer/footer';
import { Profile } from './components/profile/profile';
import { FormsModule } from '@angular/forms';
import { ActivityCard } from './activity-card/activity-card';
import { OverviewCard } from './overview-card/overview-card';

@NgModule({
  declarations: [
    Navbar,
    Footer,
    Profile,
    ActivityCard,
    OverviewCard
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    Navbar,
    Footer,
    ActivityCard,
    OverviewCard
  ]
})
export class SharedModule { }
