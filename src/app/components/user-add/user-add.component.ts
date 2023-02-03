import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractComponent } from '../abstract.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent extends AbstractComponent implements OnInit {
  userForm!: FormGroup;
  submitted: boolean = false;
  ngOnInit() {
    this.addUser();
  }
  constructor(
    public fb: FormBuilder,
    ngZone: NgZone,
    router: Router,
    public userService: UserService
  ) {
    super(ngZone, router);
  }
  addUser() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.pattern(
                      '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&\\+\\-_])(?=.*[a-zA-Z\d@$!%*?&\\+\\-_])+.{8,}$'
                      )
      ]],
    });
  }

  get ctrls() {
    console.log(this.userForm.controls)
    return this.userForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.userService.createUser(this.userForm.value).subscribe({
      next: (user) => {
        this.showSuccesAlert('/users');
      },
      error: (err) => {
        this.showErrorAlert(err.error, '/users/add');
      },
    });
  }
}
