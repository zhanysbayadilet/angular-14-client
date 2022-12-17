import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {CategoryService} from "../_services/category.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  name?: string;

  constructor(private userService: UserService,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log(user);
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.name = user.name;
    }

    this.getUserBoard();
  }

  private getUserBoard(){
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
