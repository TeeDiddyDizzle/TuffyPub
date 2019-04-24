import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { MasterComponent } from './master/master.component';

const routes: Routes = [
  { path: 'dashboard', component: MasterComponent },
]

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
