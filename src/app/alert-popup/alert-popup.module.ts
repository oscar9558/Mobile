import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertPopupPage } from './alert-popup.page';
import { DragDropModule } from '@angular/cdk/drag-drop';


const routes: Routes = [
  {
    path: '',
    component: AlertPopupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlertPopupPage],
  exports: [AlertPopupPage]
})
export class AlertPopupPageModule {}
