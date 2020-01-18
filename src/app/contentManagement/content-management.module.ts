import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { ContentManagementComponent } from './content-management.component';
import { InspectContentComponent } from './inspect-content/inspect-content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentManagementComponent
  },
  {
    path: 'contentInspection/:id',
    component: InspectContentComponent
  }
]

@NgModule({
  declarations: [
    ContentManagementComponent,
    InspectContentComponent
  ],
  exports: [
    ContentManagementComponent,
    InspectContentComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PdfViewerModule,
    RouterModule.forChild(routes)
  ]
})
export class ContentManagementModule { }
