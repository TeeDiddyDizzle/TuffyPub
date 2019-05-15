import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from "../../shared/shared.module";

import { GroupsComponent } from './groups/groups.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'groups', component: GroupsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact', component: ContactComponent }
]

@NgModule({
  declarations: [GroupsComponent, FaqComponent, ContactComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ], exports: [
    RouterModule
  ]
})
export class PagesModule { }
