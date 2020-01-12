import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:  '', loadChildren:  './auth/login/login.module#LoginPageModule' },
  { path:  'login', loadChildren:  './auth/login/login.module#LoginPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },  { path: 'collection-points', loadChildren: './Routes/collection-points/collection-points.module#CollectionPointsPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'alert-popup', loadChildren: './alert-popup/alert-popup.module#AlertPopupPageModule' },
  { path: 'personal-information', loadChildren: './user-profile/personal-information/personal-information.module#PersonalInformationPageModule' },
  { path: 'profile-information', loadChildren: './user-profile/profile-information/profile-information.module#ProfileInformationPageModule' },
  { path: 'news-inspection', loadChildren: './components/news/news-inspection/news-inspection.module#NewsInspectionPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'event-card', loadChildren: './components/events/event-card/event-card.module#EventCardPageModule' },
  { path: 'event-management', loadChildren: './components/events/event-management/event-management.module#EventManagementPageModule' },
  { path: 'list-events', loadChildren: './components/events/list-events/list-events.module#ListEventsPageModule' },
  { path: 'user-events', loadChildren: './components/events/user-events/user-events.module#UserEventsPageModule' },
  { path: 'events', loadChildren: './components/events/events.module#EventsPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
