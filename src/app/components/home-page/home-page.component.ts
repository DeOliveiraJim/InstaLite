import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractComponent } from 'src/app/components/abstract.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent extends AbstractComponent {
  constructor(
    public override ngZone: NgZone,
    public override router: Router,
    public userService: UserService
  ) {
    super(ngZone, router);
  }

  currentUser!: string;

  ngOnInit(): void {
    this.getWelcomeUser();
  }

  getWelcomeUser() {
    return this.userService.getWelcomeUser().subscribe((data) => {
      console.log(data.toString());
      this.currentUser = data;
    });
  }
}
