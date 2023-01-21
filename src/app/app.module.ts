import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CategoryComponent } from './board-admin/category/category.component';
import { Page404Component } from './error-pages/page404/page404.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { TournamentComponent } from './board-admin/tournament/tournament.component';
import {FilterTournamentPipe} from "./pipes/filter-tournament.pipe";
import {FilterCategoryPipe} from "./pipes/filter-category.pipe";
import {FilterUserPipe} from "./pipes/filter-user.pipe";
import { UsersComponent } from './board-admin/users/users.component';
import { TournamentDetailComponent } from "./tournaments/tournament-detail/tournament-detail.component";
import { UserMapComponent } from './user-map/user-map.component'
import { CategoriesComponent } from './categories/categories.component';
import { GetFirstWord } from './pipes/get-firstchar.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CategoryComponent,
    Page404Component,
    TournamentsComponent,
    TournamentComponent,
    FilterTournamentPipe,
    FilterCategoryPipe,
    FilterUserPipe,
    GetFirstWord,
    UsersComponent,
    TournamentDetailComponent,
    UserMapComponent,
    UsersComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSnackBarModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
