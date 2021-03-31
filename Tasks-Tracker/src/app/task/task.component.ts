import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  flag1:boolean = false;
  flag2:boolean = false;
  tasksList:Array<Task>=[];

  constructor(public taskSer:TaskService) { }

  ngOnInit(): void {
  }

  callAdd()
  {
    this.flag1 = !this.flag1;
    this.flag2 = false;
  }

  callList()
  {
    this.flag1 = false;
    this.flag2 = !this.flag2;
  }
  //this function store the task data using the task service
   storeTaskInfos(taskRef:any){
    console.log(taskRef);
    this.taskSer.storeTask(taskRef);
    //this.getTaskInfos();
  }

  getTaskInfos(){
    this.callList();
    this.taskSer.retrieveTask().subscribe(result=>this.tasksList=result,
      error=>console.log(error))
     // console.log(this.tasksList);
  }
}
