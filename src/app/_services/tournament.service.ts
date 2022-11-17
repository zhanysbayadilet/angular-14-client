import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Tournament} from "../_models/tournament";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  tournamentArr: Tournament[] = [];
  tournament: Tournament | undefined;
  API_URL='http://localhost:8080/api/tournament';

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(this.API_URL + '/all')
      .pipe(
        tap(tournaments => this.tournamentArr = tournaments)
      );
  }
}
