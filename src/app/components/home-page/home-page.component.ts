import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractComponent } from 'src/app/components/abstract.component';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  providers: [NavbarComponent],
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent extends AbstractComponent {

  constructor(
    public override ngZone: NgZone,
    public override router: Router,
    public userService: UserService,
    public imageService: ImageService
  ) {
    super(ngZone, router);
  }

  currentUser!: string;

  ngOnInit(): void {
    
  }
}
