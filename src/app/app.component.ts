import {Component, OnInit} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  name?: string;
  email?: string;
  selectedLanguage: any;
  languages = ['kz', 'ru', 'en'];
  constructor(private tokenStorageService: TokenStorageService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.name = user.name;
      this.email = user.email;
    }

    this.getLanguageInLocalStorage();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public selectLanguage(event: any){
    window.localStorage.removeItem('language');
    window.localStorage.setItem('language', event.target.value);
    this.translateService.use(event.target.value);
  }

  private getLanguageInLocalStorage(){
    if (window.localStorage.getItem('language')){
      this.selectedLanguage = window.localStorage.getItem('language');
    } else {
      window.localStorage.setItem('language', 'kz');
      this.selectedLanguage = window.localStorage.getItem('language');
    }
    this.translateService.use(this.selectedLanguage);
  }

}
