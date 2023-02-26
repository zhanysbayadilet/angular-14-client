import { Component, OnInit } from '@angular/core';
import {TournamentService} from "../../_services/tournament.service";
import {ActivatedRoute} from "@angular/router";
import {Tournament} from "../../_models/tournament";
import {TokenStorageService} from "../../_services/token-storage.service";
import {Category} from "../../_models/category";
import {User} from "../../_models/user";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

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
  organizer: User;
  organizerUsername: string;
  organizerEmail: string;
  private durationInSeconds: number = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  viewSubscribeButton: boolean = false;

  constructor(private tournamentService: TournamentService,
              public route: ActivatedRoute,
              private token: TokenStorageService,
              private snackBar: MatSnackBar) {
    this.tournamentId = this.route.snapshot.paramMap.get('tournamentId');
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {
    this.getTournament()
    this.checkStatusSubscribe();
  }

  getTournament(){
    return this.tournamentService.getTournament(this.tournamentId).subscribe(
      res => {
        this.tournament = res
        this.category = this.tournament.category
        this.organizer = this.tournament.organizer
        this.organizerUsername = this.organizer.username
        this.organizerEmail = this.organizer.email
      }
    );
  }

  subscribeToTournament(){
    return this.tournamentService.subscribeToTournament(this.tournamentId, this.currentUser.id).subscribe(
      res => {
        this.tournament = res;
        if (res) {
          this.checkStatusSubscribe();
          this.openSnackBar('You have successfully subscribed!', 'OК');
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  checkStatusSubscribe(){
    this.tournamentService.getStatusSubscribe(this.currentUser.id, this.tournamentId).subscribe(res =>{
      this.viewSubscribeButton = res == null;
    })
  }

  unSubscribeToTournament() {
    this.tournamentService.unsubscribeToTournament(this.currentUser.id, this.tournamentId).subscribe(res =>{
      this.checkStatusSubscribe();
      if (res == 1) {
        this.openSnackBar('You have successfully unsubscribed!', 'OК');
      } else {
        this.openSnackBar('You have successfully subscribed!', 'OК');
      }
    })
  }
}
