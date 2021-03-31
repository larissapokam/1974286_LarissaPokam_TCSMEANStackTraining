import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Task} from './task.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

 
  constructor(public http:HttpClient) { }

  //post method for insert 
  //post method takes 2 parameters 
  //1st parameter url and 2nd parameter json data. 
  storeTask(task:any){
    this.http.post("http://localhost:3000/tasks",task).
    subscribe(result=>console.log(result),error=>console.log(error));
  }

  //this function get the task from the json server
  retrieveTask():Observable<Task[]> {
    return this.http.get<Task[]>("http://localhost:3000/tasks"); //("/assets/tasks.json");
  
  }
}
