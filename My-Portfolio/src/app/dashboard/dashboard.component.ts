import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router:Router) {
    
   }

  contacts:Array<User>=new Array();
  username:string="";

  ngOnInit(): void {
   this.display();
  }

  display(){
    let saveUser = localStorage.getItem("user");
    if(saveUser==null){
      this.username = "";
    }
    else{
      this.username = saveUser;
    }
  }

  //this function save the contact entered by the user
  saveContact(userRef:any){
    let user1 = userRef.user;
    let phone = userRef.phone;

    let cont: User = new User(user1,phone);
    this.contacts.push(cont);
  }

  logout()
  {
    this.router.navigate(["login"]);
  }

}
