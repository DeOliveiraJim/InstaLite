import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractComponent } from '../abstract.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  providers: [NavbarComponent],
  selector: 'app-user-connect',
  templateUrl: './user-connect.component.html',
  styleUrls: ['./user-connect.component.css'],
})
export class UserConnectComponent extends AbstractComponent implements OnInit {
  userForm!: FormGroup;
  submitted: boolean = false;
  ngOnInit() {
    this.addUser();
  }
  constructor(
    public fb: FormBuilder,
    ngZone: NgZone,
    router: Router,
    public userService: UserService,
    private navbar: NavbarComponent
  ) {
    super(ngZone, router);
  }
  addUser() {
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  get ctrls() {
    return this.userForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userService.logUser(this.userForm.value).subscribe({
      next: (user) => {
        this.navbar.addConnectionCookie()
        this.showSuccesAlert('/home');
      },
      error: (err) => {
        this.showErrorAlert(err.error, '/login');
      },
    });
  }
}
