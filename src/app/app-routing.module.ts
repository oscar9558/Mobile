import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'content-management', loadChildren: './contentManagement/content-management.module#ContentManagementModule' },
  { path: 'collection-points', loadChildren: './Routes/collection-points/collection-points.module#CollectionPointsPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
