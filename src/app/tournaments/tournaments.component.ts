import { Component, OnInit } from '@angular/core';
import {TournamentComponent} from "../board-admin/tournament/tournament.component";
import {Tournament} from "../_models/tournament";
import {TournamentService} from "../_services/tournament.service";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournamentsArr: Tournament[] = [];
  term = '';

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
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
}
