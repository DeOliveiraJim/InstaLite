import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { WeekendComponent } from './components/weekend/weekend.component';
import { WeatherComponent } from './components/weather/weather.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientAddComponent,
    ClientEditComponent,
    HomePageComponent,
    WeekendComponent,
    WeatherComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UserListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, UserService],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
