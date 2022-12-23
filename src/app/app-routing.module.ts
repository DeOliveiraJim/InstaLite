import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  {
    path: 'users',
    component: UserListComponent,
  },
  { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
