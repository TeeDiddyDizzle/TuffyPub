import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LongformModule } from "./longform/longform.module";
import { ShortformModule } from "./shortform/shortform.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LongformModule,
    ShortformModule,
  ], exports: [
    LongformModule,
    ShortformModule
  ]
})
export class CopyModule { }
