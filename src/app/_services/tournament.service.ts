import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Tournament} from "../_models/tournament";
import {Category} from "../_models/category";

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

  getTournament(id: number): Observable<Tournament>{
    return this.http.get<Tournament>(this.API_URL + '/' + id)
  }

  deleteTournament(id: number | undefined):Observable<Tournament[]>{
    return this.http.delete<Tournament[]>(this.API_URL + '/' + id)
      .pipe(
        tap(tournaments => this.tournamentArr = tournaments)
      );
  }

  saveTournament(tournament: Tournament):Observable<Tournament> {
    return this.http.post<Tournament>(this.API_URL + '/save', tournament)
  }
}
