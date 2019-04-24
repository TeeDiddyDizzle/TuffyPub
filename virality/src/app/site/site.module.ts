import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { LandingPageModule } from "./landing-page/landing-page.module";
import { PagesModule } from "./pages/pages.module";

const routes: Routes = [
  { path: '', loadChildren: './landing-page/landing-page.module#LandingPageModule' },
  { path: '', loadChildren: './pages/pages.module#PagesModule' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LandingPageModule,
    PagesModule
  ]
})
export class SiteModule { }
