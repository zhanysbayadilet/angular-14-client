import { Pipe, PipeTransform } from '@angular/core';
import {Tournament} from "../_models/tournament";

@Pipe({
  name: 'filterTournament'
})
export class FilterTournamentPipe implements PipeTransform {

  transform(tournaments: Tournament[], search?: any): any {
    if (!tournaments) return null;
    if (!search) return tournaments;

    return tournaments.filter(t => t.id.toString().toLowerCase().includes(search.toLowerCase())
      || t.name.toString().toLowerCase().includes(search.toLowerCase())
      || t.start_date.toString().toLowerCase().includes(search.toLowerCase())
      || t.category.category_name.toString().toLowerCase().includes(search.toLowerCase())
      || t.prize_fund.toString().toLowerCase().includes(search.toLowerCase())
    );

  }

}
