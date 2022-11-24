import { Component, OnInit } from '@angular/core';
import {TournamentComponent} from "../board-admin/tournament/tournament.component";
import {Tournament} from "../_models/tournament";
import {TournamentService} from "../_services/tournament.service";
import {CategoryService} from "../_services/category.service";
import {Category} from "../_models/category";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournaments: Tournament[] = [];
  categories: Category[] = [];
  term = '';
  date = '';
  category = '';

  constructor(private tournamentService: TournamentService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllTournaments();
    this.getAllCategories();
  }

  public getAllTournaments(){
    this.tournamentService.getTournaments().subscribe(
      tournaments => {
        this.tournaments = tournaments;
        console.log(this.tournaments);
      }
    );
  }


  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    )
  }


}
