import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {CategoryService} from "../_services/category.service";
import {Category} from "../_models/category";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  categoriesArr: Category[] = [];
  isOpen: boolean;

  constructor(private userService: UserService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getUserContent();
    this.getAllCategories();
  }

  private getUserContent(){
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
        console.log('categoriesArr:' + this.categoriesArr);
      }
    )
  }
}
