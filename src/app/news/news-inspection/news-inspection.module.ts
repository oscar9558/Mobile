import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsInspectionComponent } from './news-inspection.component';

@NgModule({
  declarations: [NewsInspectionComponent],
  exports: [NewsInspectionComponent],
  imports: [
    CommonModule
  ]
})
export class NewsInspectionModule { }
