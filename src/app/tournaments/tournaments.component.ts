import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../_services/tournament.service";
import {CategoryService} from "../_services/category.service";
import {Category} from "../_models/category";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  standalone: false,
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournaments: any[];
  categories: Category[] = [];
  term = '';
  date = '';
  category = '';
  private params: any;
  pageNumber = 1;
  pageSize = 10;
  searchText: string;
  totalElements: any;
  totalLength: number;

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
    console.log("Test log")
    this.params = null;
    this.params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber - 1,
    };

    // if (this.searchText !== undefined ) {
    //   this.params.searchText = this.searchText;
    // }

    this.tournamentService.getTournaments(this.params).subscribe(res => {
        this.tournaments = res.content;
        this.totalElements = res.total;
      }
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
