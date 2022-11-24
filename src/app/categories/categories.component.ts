import { Component, OnInit } from '@angular/core';
import {Category} from "../_models/category";
import {CategoryService} from "../_services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoriesArr: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
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

}
