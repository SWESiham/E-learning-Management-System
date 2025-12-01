import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@NgModule({
  declarations: [
    Navbar,
    Footer
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Navbar,
    Footer
  ]
})
export class SharedModule { }