import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { WeekendComponent } from './components/weekend/weekend.component';
import { WeatherComponent } from './components/weather/weather.component';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';

@NgModule({
  declarations: [AppComponent, UserListComponent, UserAddComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UserListComponent,
    HomePageComponent,
    WeekendComponent,
    WeatherComponent,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
