import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from "../_services/user.service";
import {Tournament} from "../_models/tournament";
import {Category} from "../_models/category";
import {TournamentService} from "../_services/tournament.service";
import {CategoryService} from "../_services/category.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUserInToken: any;
  currentUser: any;
  tournaments: Tournament[];
  showCreateTournament: boolean = false;
  tournament: Tournament = new Tournament();
  categoriesArr: Category[] = [];
  myTournaments: Tournament[];

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private tournamentService: TournamentService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.currentUserInToken = this.token.getUser();
    this.userService.getUser(this.currentUserInToken.id).subscribe(res=>{
      this.currentUser = res;
      console.log(this.currentUser)
    });
    this.userService.getUserTournaments(this.currentUserInToken.id).subscribe(tournaments=>{
      this.tournaments = tournaments;
      console.log(this.currentUserInToken.id);
      console.log(this.tournaments);
    });
    this.userService.getMyTournaments(this.currentUserInToken.id).subscribe(myTournaments=>{
      this.myTournaments = myTournaments;
      console.log(this.currentUserInToken.id);
      console.log(this.myTournaments);
    });
    this.getAllCategories();
  }

  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
      }
    )
  }

  createTournamentForm() {
    this.showCreateTournament = true;
  }

  submit() {
    this.saveTournament();
  }

  saveTournament(){
    console.log(this.tournament.category);
    console.log(this.tournament);
    this.tournament.organizer = this.currentUser;
    this.tournamentService.saveTournament(this.tournament).subscribe(
      data => data = this.tournament
    );
    window.location.reload();
  }

  hideCreateTournament() {
    this.showCreateTournament = false;
    this.tournament = new Tournament();
  }

}
