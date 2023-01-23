import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  providers: [NavbarComponent],
  selector: 'app-user-disconnect',
  templateUrl: './user-disconnect.component.html',
  styleUrls: ['./user-disconnect.component.css']
})
export class UserDisconnectComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private navbar: NavbarComponent) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logoutUser().subscribe(
      {
        next: msg => {
          this.navbar.removeConnectionCookie()
          this.router.navigateByUrl('/home')
        }
      }
    )
  }

}
