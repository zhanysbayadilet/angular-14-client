import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {UserService} from "../_services/user.service";
import {Tournament} from "../_models/tournament";
import {Category} from "../_models/category";
import {TournamentService} from "../_services/tournament.service";
import {CategoryService} from "../_services/category.service";
import {DomSanitizer} from "@angular/platform-browser";
import {User} from "../_models/user";
import {map} from "rxjs";
import {NgForm} from "@angular/forms";
import {FileHandle} from "../_models/file-handle.model";
import {ImageProcessingService} from "../_services/image-processing.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUserInToken: any;
  currentUser: User = {
    email: "",
    password: "",
    username: "",
    roles: [],
    userImages: []
  };
  tournaments: Tournament[];
  showCreateTournament: boolean = false;
  tournament: Tournament = new Tournament();
  categoriesArr: Category[] = [];
  myTournaments: Tournament[];
  showEditUser = false;

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private tournamentService: TournamentService,
              private categoryService: CategoryService,
              private sanitizer: DomSanitizer,
              private imageProcessingService: ImageProcessingService
              ) { }

  ngOnInit(): void {
    this.currentUserInToken = this.token.getUser();
    this.userService.getUser(this.currentUserInToken.id)
      .pipe(map( user => this.imageProcessingService.createImages(user) ))
      .subscribe(res=>{
        this.currentUser = res;
        console.log(this.currentUser);
        console.log(this.currentUser.userImages);
      });
    this.userService.getUserTournaments(this.currentUserInToken.id).subscribe(tournaments=>{
      this.tournaments = tournaments;
    });
    this.userService.getMyTournaments(this.currentUserInToken.id).subscribe(myTournaments=>{
      this.myTournaments = myTournaments;
    });
    this.getAllCategories();
  }

  private getAllCategories(){
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categoriesArr = categories;
      }
    )
  }

  createTournamentForm() {
    this.showCreateTournament = true;
  }

  submitTournament() {
    this.saveTournament();
  }

  saveTournament(){
    this.tournament.organizer = this.currentUser;
    this.tournamentService.saveTournament(this.tournament).subscribe(
      data => data = this.tournament
    );
    window.location.reload();
  }

  hideCreateTournament() {
    this.showCreateTournament = false;
    this.tournament = new Tournament();
  }

  submitUser(userForm: NgForm) {
    const userFormData = this.prepareFormData(this.currentUser)
    this.userService.saveUser(userFormData)
      .subscribe( res =>{
        console.log("Successfully saved!");
      }
    );
    window.location.reload();
  }

  prepareFormData(user: User): FormData {
    const formData = new FormData();
    formData.append(
      'user',
      new Blob([JSON.stringify(user)], {type: 'application/json'})
    );

    for (let i = 0; i < user.userImages.length; i++){
      formData.append(
        'imageFile',
        user.userImages[i].file,
        user.userImages[i].file.name ,
      );
    }

    return formData;
  }

  showEditUserFrom(){
    this.showEditUser = true;
  }

  hideEditUser() {
    this.showEditUser = false;
    window.location.reload();
  }

  onFileSelected(event: any) {
    if (event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      };

      this.currentUser.userImages.push(fileHandle);
    }

  }

  removeImage(i: number) {
    this.currentUser.userImages.splice(i, 1);
  }
}
