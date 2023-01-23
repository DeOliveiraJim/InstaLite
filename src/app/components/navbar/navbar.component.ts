import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent extends AbstractComponent implements OnInit {
  title = 'InstaLite';
  isAuthenticated = false;
  testBoolean = false;

  constructor(
    private userService: UserService,
    ngZone: NgZone,
    router: Router,
    private cookieService: CookieService,
    private cdr: ChangeDetectorRef
  ) {
    super(ngZone, router);
  }

  ngOnInit() {
    console.log(this.cookieService.getAll());
    this.isAuthenticated = this.isConnected();
  }

  isConnected() {
    return this.cookieService.check('authentified');
  }

  addConnectionCookie() {
    this.cookieService.set('authentified', 'true', 2);
    this.isAuthenticated = true;
    this.cdr.detectChanges();
    window.location.reload();
    window.location.href = '';
  }

  removeConnectionCookie() {
    this.cookieService.delete('authentified');
    this.isAuthenticated = false;
    this.cdr.detectChanges();
    window.location.reload();
    window.location.href = '';
  }
}
