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
  tournaments: Tournament[] = [];
  tournament: Tournament = new Tournament();
  categoriesArr: Category[] = [];
  category: Observable<Category> = new Observable<Category>();
  showAdminBoard = false;
  isLoggedIn = false;
  private roles: string[] = [];
  showCreateTournament: boolean = false;
  showEditTournament: boolean = false;
  object:Object = Object.keys(this.tournament).length;
  term = '';
  private params: any;
  pageNumber = 1;
  pageSize = 10;
  searchText: string;
  totalElements: any;

  constructor(private tournamentService: TournamentService,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
    this.getAllTournaments();
    this.getAllCategories();
  }

  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
      }
    )
  }

  public getAllTournaments(){
    this.params = null;
    this.params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber - 1,
    };

    if (this.searchText !== undefined ) {
      this.params.searchText = this.searchText;
    }

    this.tournamentService.getTournaments(this.params).subscribe(res => {
        this.tournaments = res.content;
        this.totalElements = res.total;
      }
    );
  }

  createTournamentForm() {
    this.showCreateTournament = true;
  }

  editTournamentForm(tournament: Tournament) {
    this.showEditTournament = true;
    this.tournament = tournament;
  }

  deleteTournament(id: number) {
    this.tournamentService.deleteTournament(id)
      .pipe()
      .subscribe(()=>{
        this.getAllTournaments();
        window.location.reload();
      });
  }

  submit() {
    this.saveTournament();
  }

  saveTournament(){
    console.log(this.tournament.category);
    console.log(this.tournament);
    console.log(this.category);
    this.tournamentService.saveTournament(this.tournament).subscribe(
      data => data = this.tournament
    );
    window.location.reload();
  }

  hideCreateTournament() {
    this.showCreateTournament = false;
    this.showEditTournament = false;
    this.tournament = new Tournament();
  }
}
