import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";

import { ShortformMasterComponent } from './shortform-master/shortform-master.component';

@NgModule({
  declarations: [ShortformMasterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ShortformMasterComponent,
  ]
})
export class ShortformModule { }
