import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {CategoryComponent} from "./board-admin/category/category.component";
import {TournamentsComponent} from "./tournaments/tournaments.component";
import {TournamentComponent} from "./board-admin/tournament/tournament.component";
import {UsersComponent} from "./board-admin/users/users.component";
import {TournamentDetailComponent} from "./tournaments/tournament-detail/tournament-detail.component";
import {UserMapComponent} from "./user-map/user-map.component";
import {CategoriesComponent} from "./categories/categories.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'admin',
    component: BoardAdminComponent,
    children: [
      { path: 'tournaments', component: TournamentComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'users', component: UsersComponent }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'tournaments/:tournamentId', component: TournamentDetailComponent},
  { path: 'usermap', component: UserMapComponent},
  { path: 'category', component: CategoriesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
