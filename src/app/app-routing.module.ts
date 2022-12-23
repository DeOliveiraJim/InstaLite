import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ImageAddComponent } from './components/image-add/image-add.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  { path: '', component: HomePageComponent },
  {
    path: 'images',
    component: ImageAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
