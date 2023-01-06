import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractComponent } from '../abstract.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent extends AbstractComponent implements OnInit {

  userForm!: FormGroup;
  submitted: boolean = false;
  username : string = "";

  ngOnInit() {
    this.getUser();
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


  setUserInfos() {
    var id = this.actRoute.snapshot.paramMap.get('id')!;
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.username = data.username;
      },
      error: (err) => {
        this.showErrorAlert(err, '/profile');
      },
    });
  }





  
  getUser() {
    this.userForm = this.fb.group({
      oldPassword: [''],
      newPassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&\+\-_])(?=.*[a-zA-Z\d@$!%*?&+-_])+.{8,}$')]],
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
    this.userService.createUser(this.userForm.value).subscribe({
      next: (user) => {
        this.showSuccesAlert('/users');
      },
      error: (err) => {
        this.showErrorAlert(err, '/users/add');
      },
    });
  }
}
