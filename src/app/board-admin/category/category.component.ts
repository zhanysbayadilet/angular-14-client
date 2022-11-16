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
        console.log('categoriesArr:' + this.categoriesArr);
      }
    )
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
    this.categoryService.createCategory(this.category).subscribe(
      () => this.category //TODO
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

  editCategory(category: Category) {
    this.showCreateCategory = true;
    this.category = category;
  }
}
