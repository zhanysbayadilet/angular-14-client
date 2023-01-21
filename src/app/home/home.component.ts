import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {CategoryService} from "../_services/category.service";
import {Category} from "../_models/category";
import {TournamentService} from "../_services/tournament.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  categoriesArr: Category[] = [];
  countUsers: number;
  countTournaments: number;
  countOrganizations: number = 15;
  countPartners: number = 5;
  loadingMode: boolean;
  progressValue: number = 0;

  constructor(private userService: UserService,
              private categoryService: CategoryService,
              private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getUserContent();
    this.getAllCategories();
    (async () => {
      this.loadingMode = true;
      this.progressValue = 0;
      await delay(1000);
      this.progressValue = 100;
      await delay(1000);
      this.loadingMode = false;
      async function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
      }
    })();
    this.getCountUsers();
    this.getCountTournaments();
  }

  private getUserContent(){
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
      }
    );
  }

  private getCountUsers(){
    this.userService.getCountUsers().subscribe(res=>{
      this.countUsers = res;
    });
  }

  private getCountTournaments(){
    this.tournamentService.getCountTournaments().subscribe(res=>{
      this.countTournaments = res;
    })
  }
}
