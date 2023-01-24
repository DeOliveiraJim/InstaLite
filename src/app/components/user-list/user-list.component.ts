import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractComponent } from 'src/app/components/abstract.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent extends AbstractComponent implements OnInit {
  userList: User[] = [];
  pages: number = 1;
  orderName: string = '(croissant)';
  sortNbName: number = -1;
  searchList: User[] = [];

  ngOnInit() {
    this.loadUsers();
    this.checkAdmin();
  }
  constructor(
    public userService: UserService,
    private actRoute: ActivatedRoute,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
  }

  checkAdmin() {
    this.userService.getUser().subscribe({
      next: (data) => {
        if (data.role == 'ROLE_ADMIN') {
          return;
        }
        this.router.navigateByUrl('forbidden');
      },
      error: (err) => {
        this.router.navigateByUrl('forbidden');
      },
    });
  }

  // users list
  loadUsers() {
    return this.userService.getUsers().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.userList.push(...data);
          this.searchList = Array.from(this.userList);
        }
      },
      error: (err) => {
        this.router.navigateByUrl('forbidden');
      },
    });
  }

  // Delete user
  deleteUser(data: User) {
    let index = this.userList
      .map((user: { username: string }) => {
        return user.username;
      })
      .indexOf(data.username);
    return this.userService.deleteUser(data.id).subscribe({
      next: (res) => {
        this.userList.splice(index, 1);
        this.showSuccesAlert('/users');
      },
      error: (err) => {
        this.router.navigateByUrl('forbidden');
      },
    });
  }

  onSubmit(event: SubmitEvent) {
    if (event.target === null) return;
    const target = event.target as HTMLFormElement;
    const searchForm = target.childNodes[0] as HTMLInputElement;
    this.research(searchForm.value);
  }

  research(userName: string) {
    this.userList = Array.from(this.searchList)
      .filter((user: { username: string }) => user.username.includes(userName))
      .sort((a, b) => (a.username.length < b.username.length ? -1 : 1));
  }

  resetSearch() {
    this.userList = Array.from(this.searchList);
  }
}
