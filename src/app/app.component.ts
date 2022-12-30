import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'InstaLite';

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getWelcomeUser().subscribe({
      next: msg => console.log(msg),
      error: err => console.log(err)
    })
  }

}
