import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AbstractComponent } from './components/abstract.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractComponent implements OnInit {
  title = 'InstaLite';
  isAuthenticated = false;

  constructor(
    private userService: UserService, ngZone: NgZone, router: Router
  ) {
    super(ngZone, router);
  }

  ngOnInit() {
    this.userService.getWelcomeUser().subscribe({
      next: (str) => {
        this.isAuthenticated = true;
      },
      error: (err) => {
        this.isAuthenticated = false;
        console.log("AIE AIE OUILLE")
      },
    })
  }

}
