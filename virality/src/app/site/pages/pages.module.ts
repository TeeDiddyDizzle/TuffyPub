import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";

import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent }
]

@NgModule({
  declarations: [AboutComponent, FaqComponent, ContactComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ], exports: [
    RouterModule
  ]
})
export class PagesModule { }
