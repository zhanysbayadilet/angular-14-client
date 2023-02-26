import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Tournament} from "../_models/tournament";
import {User} from "../_models/user";


@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  tournamentArr: Tournament[] = [];
  tournament: Tournament | undefined;
  API_URL='http://localhost:8080/api/tournament/';

  constructor(private http: HttpClient) { }
  requestConstructor(params: any) {
    let requestParams = '?';
    for (const param in params) {
      requestParams += (params[param] === '' || params[param] === null)
        ? '' : (param + '=' + params[param] + '&')
    }
    return requestParams;
  }

  getTournaments(params: any): Observable<any> {
    return this.http.get(this.API_URL + 'all' + this.requestConstructor(params));
  }

  getTournament(id: number): Observable<Tournament>{
    return this.http.get<Tournament>(this.API_URL + id);
  }

  deleteTournament(id: number | undefined):Observable<Tournament[]>{
    return this.http.delete<Tournament[]>(this.API_URL + id)
      .pipe(
        tap(tournaments => this.tournamentArr = tournaments)
      );
  }

  saveTournament(tournament: Tournament):Observable<Tournament> {
    return this.http.post<Tournament>(this.API_URL + 'save', tournament);
  }

  subscribeToTournament(tournamentId: number, currentUserId: number) {
    return this.http.post<Tournament>(this.API_URL + currentUserId + '/' + tournamentId, {});
  }

  getCountTournaments(): Observable<number> {
    return this.http.get<number>(this.API_URL + 'count');
  }

  getTournamentParticipants(id: number | undefined): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + id + '/participants');
  }

  getStatusSubscribe(userId: number, tournamentId: number): Observable<boolean> {
    return this.http.get<boolean>(this.API_URL + 'userId/' + userId + '/tournamentId/' + tournamentId);
  }

  unsubscribeToTournament(userId: number, tournamentId: number): Observable<number> {
    return this.http.delete<number>(
      this.API_URL + 'userId/' + userId + '/tournamentId/' + tournamentId + '/unsubscribe'
    );
  }
}
