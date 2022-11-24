import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {Category} from "../_models/category";
import {CategoryService} from "../_services/category.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  categoriesArr: Category[] = [];
  category: Category = new Category();

  private roles: string[] = [];
  content?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  name?: string;

  showCreateCategory: boolean = false;

  constructor(private userService: UserService,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService,
              private router: Router) { }

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
    this.getAllCategories();
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

  //category methods
  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
        console.log('categoriesArr:' + this.categoriesArr);
      }
    )
  }

  deleteCategory(id: number | undefined) {
    this.categoryService.deleteCategory(id)
      .pipe()
      .subscribe(()=>{
        this.categoryService.getCategories()
        window.location.reload();
      });
  }


  createCategory() {
    this.showCreateCategory = true;
  }

  hideCreateCategory() {
    this.showCreateCategory = false;
  }

  submit(){
    this.saveCategory();
  }

  saveCategory(){
    this.categoryService.saveCategory(this.category).subscribe(
      data => data = this.category
    );
    window.location.reload();
  }
  //end category methods
}
