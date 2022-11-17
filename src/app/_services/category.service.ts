import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import {Category} from "../_models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryArr: Category[] = [];
  category: Category | undefined;
  API_URL='http://localhost:8080/api/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.API_URL + '/all')
      .pipe(
        tap(categories => this.categoryArr = categories)
      );
  }

  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(this.API_URL + '/' + id)
  }

  deleteCategory(id: number | undefined):Observable<Category[]>{
    return this.http.delete<Category[]>(this.API_URL + '/' + id)
      .pipe(
        tap(categories => this.categoryArr = categories)
      );
  }

  createCategory(category: Category):Observable<Object> {
    return this.http.post(this.API_URL, category)
  }
}
