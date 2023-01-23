import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserConnectComponent } from './components/user-connect/user-connect.component';
import { UserDisconnectComponent } from './components/user-disconnect/user-disconnect.component';
import { FilesEditComponent } from './components/files-edit/files-edit.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { FilesAddComponent } from './components/files-add/files-add.component';
import { FilesDisplayComponent } from './components/files-display/files-display.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'display',
    component: FilesDisplayComponent,
  },
  {
    path: 'users/add',
    component: UserAddComponent,
  },
  { path: 'home', component: HomePageComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'files',
    component: FilesAddComponent,
  },
  {
    path: 'login',
    component: UserConnectComponent,
  },
  {
    path: 'logout',
    component: UserDisconnectComponent,
  },
  {
    path: 'files/edit/:id',
    component: FilesEditComponent,
  },
  {
    path: 'profile',
    component: UserPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
