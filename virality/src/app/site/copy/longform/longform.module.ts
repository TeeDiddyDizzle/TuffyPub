import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";

import { LongformMasterComponent } from './longform-master/longform-master.component';

@NgModule({
  declarations: [LongformMasterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LongformMasterComponent,
  ]
})
export class LongformModule { }
