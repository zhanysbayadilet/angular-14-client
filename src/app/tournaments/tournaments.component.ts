import { Component, OnInit } from '@angular/core';
import {Tournament} from "../_models/tournament";
import {TournamentService} from "../_services/tournament.service";
import {CategoryService} from "../_services/category.service";
import {Category} from "../_models/category";
import {ActivatedRoute, Router} from "@angular/router";

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
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              public router: Router) {
    this.route.queryParams.subscribe(params => this.category = params.category)
  }

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

  goToTournament(tournamentId: number) {
    this.router.navigate([`/tournaments/${tournamentId}`]);
  }
}
