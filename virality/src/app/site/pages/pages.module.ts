import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";

import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { RoadmapComponent } from './roadmap/roadmap.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'roadmap', component: RoadmapComponent },
]

@NgModule({
  declarations: [AboutComponent, FaqComponent, ContactComponent, RoadmapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ], exports: [
    RouterModule
  ]
})
export class PagesModule { }
