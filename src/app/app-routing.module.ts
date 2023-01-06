import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ImageAddComponent } from './components/image-add/image-add.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserConnectComponent } from './components/user-connect/user-connect.component';
import { UserDisconnectComponent } from './components/user-disconnect/user-disconnect.component';
import { FilesEditComponent } from './components/files-edit/files-edit.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/add',
    component: UserAddComponent,
  },
  { path: 'home', component: HomePageComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'files',
    component: ImageAddComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
