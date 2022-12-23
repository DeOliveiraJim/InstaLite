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
  }
  constructor(
    public userService: UserService,
    private actRoute: ActivatedRoute,
    public override ngZone: NgZone,
    public override router: Router
  ) {
    super(ngZone, router);
  }
  // users list
  loadUsers() {
    return this.userService.getUsers().subscribe((data) => {
      this.userList.push(...data);
      this.searchList = Array.from(this.userList);
    });
  }
  // Delete user
  deleteUser(data: User) {
    let index = this.userList
      .map((user: { name: string }) => {
        return user.name;
      })
      .indexOf(data.name);
    return this.userService.deleteUser(data.id).subscribe((res) => {
      this.userList.splice(index, 1);
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
      .filter((user: { name: string }) => user.name.includes(userName))
      .sort((a, b) => (a.name.length < b.name.length ? -1 : 1));
  }

  resetSearch() {
    this.userList = Array.from(this.searchList);
  }

  sortData(sortingBy: string) {
    if (sortingBy == 'Nom') {
      if (this.orderName == '(croissant)') {
        this.orderName = '(décroissant)';
      } else {
        this.orderName = '(croissant)';
      }
      this.sortNbName = -this.sortNbName;

      this.userList.sort((a: { name: string }, b: { name: string }) => {
        if (a.name < b.name) {
          return -this.sortNbName;
        } else {
          return this.sortNbName;
        }
      });
    }
  }
}
