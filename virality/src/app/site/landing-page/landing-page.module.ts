import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { CopyModule } from "../copy/copy.module";
import { ReactiveFormsModule } from '@angular/forms';
import { AuthpagesModule } from "../../users/authpages/authpages.module";


import { MasterComponent } from "./master/master.component";

const routes: Routes = [
  { path: '', component: MasterComponent },

]

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CopyModule,
    ReactiveFormsModule,
    AuthpagesModule
  ],
  exports: [
    RouterModule
  ]
})
export class LandingPageModule { }
