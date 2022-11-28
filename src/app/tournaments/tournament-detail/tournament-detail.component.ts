import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../../_services/tournament.service";
import {ActivatedRoute} from "@angular/router";
import {Tournament} from "../../_models/tournament";
import {TokenStorageService} from "../../_services/token-storage.service";
import {Category} from "../../_models/category";

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  tournamentId: any;
  currentUser: any;
  tournament: Tournament = new Tournament();
  category: Category = new Category();
  showSuccessAlert: boolean = false;

  constructor(private tournamentService: TournamentService,
              public route: ActivatedRoute,
              private token: TokenStorageService) {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {
    this.getTournament()
  }

  getTournament(){
    return this.tournamentService.getTournament(this.tournamentId).subscribe(
      res => {
        this.tournament = res
        this.category = this.tournament.category
      }
    );
  }

  subscribeToTournament(){
    this.showSuccess()
    return this.tournamentService.subscribeToTournament(this.tournamentId, this.currentUser.id).subscribe(
      res => {
        this.tournament = res
      }
    )
  }

  showSuccess(){
    (async () => {
      this.showSuccessAlert = true;
      await delay(5000);
      this.showSuccessAlert = false;

      async function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
      }
    })();
  }

}
