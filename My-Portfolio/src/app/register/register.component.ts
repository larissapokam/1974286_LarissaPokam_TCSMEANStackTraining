import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  saveUser(loginRef:any) {
    //console.log("Event generated");
    console.log(loginRef);
    let user1 = loginRef.username;
    let pass1 = loginRef.pass;
    localStorage.setItem("user",user1);
    localStorage.setItem("pass",pass1);

    this.router.navigate(["login"]);
  
  }

  logout()
  {
    this.router.navigate(["login"]);
  }
}
