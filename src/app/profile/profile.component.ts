import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUserInToken: any;
  currentUser: any;

  constructor(private token: TokenStorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInToken = this.token.getUser();
    this.userService.getUser(this.currentUserInToken.id).subscribe(res=>{
      this.currentUser = res;
      console.log(this.currentUser.tournaments);
    });
  }


}
