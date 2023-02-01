import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent extends AbstractComponent implements OnInit {
  userForm!: FormGroup;
  submitted: boolean = false;
  username: string = '';
  idUser: number = 0;

  ngOnInit() {
    this.getUser();
    this.getUserId();
  }

  constructor(
    public fb: FormBuilder,
    ngZone: NgZone,
    router: Router,
    private actRoute: ActivatedRoute,
    public userService: UserService
  ) {
    super(ngZone, router);
  }

  getUserId() {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.idUser = data.id;
        this.username = data.username;
      },
      error: (err) => {
        if (err.status == 403) {
          this.router.navigateByUrl('forbidden')
        }
      },
    });
  }

  getUser() {
    this.userForm = this.fb.group({
      oldPassword: [''],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&+-_])(?=.*[a-zA-Zd@$!%*?&+-_])+.{8,}$'
          ),
        ],
      ],
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
    this.userService.updateUser(this.idUser, this.userForm.value).subscribe({
      next: (user) => {
        this.showSuccesAlert('/profile');
      },
      error: (err) => {
        this.router.navigateByUrl('forbidden')
      },
    });
  }
}
