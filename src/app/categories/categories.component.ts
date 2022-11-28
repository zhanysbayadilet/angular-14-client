import { Component, OnInit } from '@angular/core';
import {Category} from "../_models/category";
import {CategoryService} from "../_services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoriesArr: Category[] = [];
  term = '';

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
      }
    )
  }

  goToTournaments() {
    this.router.navigate([`/tournaments`]);
  }
}
