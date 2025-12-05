import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from '../modules/home/components/footer/footer';
import { Profile } from './components/profile/profile';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Navbar,
    Footer,
    Profile
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    Navbar,
    Footer
  ]
})
export class SharedModule { }
