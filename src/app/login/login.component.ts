import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[];
  // currentUser: User;
  isLoggedIn: boolean = false;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(dataLastEmittedFromObserver => {
      this.users = dataLastEmittedFromObserver;
   });
 }
  checkLogin(userName, userPass){
    console.log(this.users);
    for(let i = 0; i < this.users.length; i++) {
      if (this.users[i].username == userName) {
        if (this.users[i].password == userPass) {
          this.isLoggedIn = true;
          this.userService.currentUserIndex.next(i.toString());
        }
      }
    }
    if (this.isLoggedIn) {
      this.router.navigate(['home']);
    } else {
      alert("Incorrect username/password");
    }
  }

  signUp() {
    this.router.navigate(['signup']);
  }

}
