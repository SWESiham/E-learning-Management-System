import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing-module';
import { Hero } from './components/hero/hero';
import { Highlights } from './components/highlights/highlights';
import { Stats } from './components/stats/stats';
import { CallToAction } from './components/call-to-action/call-to-action';
import { HomeNavbar } from './components/home-navbar/home-navbar';
import { Home } from './home';


@NgModule({
  declarations: [
    Hero,
    Highlights,
    Stats,
    CallToAction,
    HomeNavbar,
    Home
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
