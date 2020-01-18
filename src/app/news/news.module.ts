import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { NewsInspectionComponent } from './news-inspection/news-inspection.component';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  },
  {
    path: 'newsInspection/:id',
    component: NewsInspectionComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsPage, NewsInspectionComponent ],
  exports: [NewsPage, NewsInspectionComponent ]
})
export class NewsPageModule {}
