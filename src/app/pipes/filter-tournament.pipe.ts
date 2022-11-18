import { Pipe, PipeTransform } from '@angular/core';
import {Tournament} from "../_models/tournament";

@Pipe({
  name: 'filterTournament'
})
export class FilterTournamentPipe implements PipeTransform {

  transform(products: Tournament[], search: string): Tournament[] {
    return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

}
