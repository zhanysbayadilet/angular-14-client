import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user";
import {TokenStorageService} from "../../_services/token-storage.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userArr: User[] = [];
  user: User = new User();
  showAdminBoard = false;
  isLoggedIn = false;
  private roles: string[] = [];
  showEditUser: boolean = false;
  object:Object = Object.keys(this.user).length
  term = ''

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.getAllUsers();
  }

  private getAllUsers(){
    this.userService.getUsers().subscribe(
      users => {
        this.userArr = users;
      }
    )
  }

  editUser(user: User) {
    this.showEditUser = true;
    this.user = user;
  }

  hideEditCategory() {
    this.showEditUser = false;
    this.user = new User();
  }

  submit(){
    // this.saveUser();
  }

  // saveUser(){
  //   this.userService.saveUser(this.user).subscribe(
  //     data => data = this.user
  //   );
  //   window.location.reload();
  // }

  deleteUser(id: number | undefined) {
    this.userService.deleteUser(id)
      .pipe()
      .subscribe(()=>{
        this.userService.getUsers()
        window.location.reload();
      });
  }

}
