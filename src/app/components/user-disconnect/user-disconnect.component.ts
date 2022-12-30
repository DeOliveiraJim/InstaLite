import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-disconnect',
  templateUrl: './user-disconnect.component.html',
  styleUrls: ['./user-disconnect.component.css']
})
export class UserDisconnectComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.displayLogout().subscribe( str => console.log(str))
  }

  logout() {
    this.userService.logoutUser().subscribe()
  }

}
