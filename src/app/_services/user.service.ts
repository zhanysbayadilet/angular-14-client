import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from "../_models/user";
import {Tournament} from "../_models/tournament";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userArr: User[] = [];
  user: User | undefined;
  API_URL = 'http://localhost:8080/api/test/';
  API_URL2='http://localhost:8080/api/user/';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'admin', { responseType: 'text' });
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.API_URL2 + 'all')
      .pipe(
        tap(users => this.userArr = users)
      );
  }

  getUser(id: any | undefined): Observable<User>{
    return this.http.get<User>(this.API_URL2 + id);
  }

  deleteUser(id: number | undefined):Observable<User[]>{
    return this.http.delete<User[]>(this.API_URL2 + id);
  }

  saveUser(user: User):Observable<Object> {
    return this.http.post(this.API_URL2 + 'save', user);
  }

  getCountUsers(): Observable<number> {
    return this.http.get<number>(this.API_URL2 + 'count');
  }

  getUserTournaments(id: number | undefined): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.API_URL2 + id + '/tournaments');
  }
}
