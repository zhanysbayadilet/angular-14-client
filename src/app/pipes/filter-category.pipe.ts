import { Pipe, PipeTransform } from '@angular/core';
import {Category} from "../_models/category";

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(products: Category[], search: string): Category[] {
    return products.filter(p => p.category_name.toLowerCase().includes(search.toLowerCase()));
  }

}
