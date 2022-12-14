import { Component, OnInit } from '@angular/core';
import {Category} from "../../_models/category";
import {CategoryService} from "../../_services/category.service";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoriesArr: Category[] = [];
  category: Category = new Category();
  showAdminBoard = false;
  isLoggedIn = false;
  private roles: string[] = [];
  showCreateCategory: boolean = false;
  showEditCategory: boolean = false;
  object:Object = Object.keys(this.category).length
  term = ''

  constructor(private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.getAllCategories();
  }

  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
      }
    )
  }

  createCategory() {
    this.showCreateCategory = true;
  }

  editCategory(category: Category) {
    this.showEditCategory = true;
    this.category = category;
  }

  hideCreateCategory() {
    this.showCreateCategory = false;
    this.showEditCategory = false;
    this.category = new Category();
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

  deleteCategory(id: number | undefined) {
    this.categoryService.deleteCategory(id)
      .pipe()
      .subscribe(()=>{
        this.categoryService.getCategories()
        window.location.reload();
      });
  }
}
