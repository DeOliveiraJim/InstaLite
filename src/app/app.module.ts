import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ImageAddComponent } from './components/image-add/image-add.component';
import { UserConnectComponent } from './components/user-connect/user-connect.component';
import { AuthInterceptor } from './authinterceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomePageComponent,
    UserAddComponent,
    WeatherComponent,
    WeekendComponent,
    ImageAddComponent,
    UserConnectComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
