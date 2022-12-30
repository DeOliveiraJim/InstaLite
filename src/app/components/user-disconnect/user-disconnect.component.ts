import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-disconnect',
  templateUrl: './user-disconnect.component.html',
  styleUrls: ['./user-disconnect.component.css']
})
export class UserDisconnectComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logoutUser().subscribe(
      {
        next: msg => this.router.navigateByUrl('/home')
      }
    )
  }

}
