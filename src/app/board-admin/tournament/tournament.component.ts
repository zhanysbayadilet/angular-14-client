import { Component, OnInit } from '@angular/core';
import {Category} from "../../_models/category";
import {TournamentService} from "../../_services/tournament.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {Tournament} from "../../_models/tournament";
import {CategoryService} from "../../_services/category.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  tournamentsArr: Tournament[] = [];
  tournament: Tournament = new Tournament();
  category: Observable<Category> = new Observable<Category>();
  showAdminBoard = false;
  isLoggedIn = false;
  private roles: string[] = [];
  showCreateTournament: boolean = false;
  object:Object = Object.keys(this.tournament).length

  constructor(private tournamentService: TournamentService,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.getAllTournaments();
  }

  public getAllTournaments(){
    this.tournamentService.getTournaments().subscribe(
      tournaments => {
        this.tournamentsArr = tournaments;
        console.log(this.tournamentsArr);
      }
    );
  }

  createCategory() {

  }

  editCategory(tournament: Tournament) {

  }

  deleteCategory(id: number) {

  }

  submit() {

  }

  hideCreateCategory() {

  }
}
