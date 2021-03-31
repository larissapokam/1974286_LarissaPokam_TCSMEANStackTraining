import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { Question } from "./question.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(public http:HttpClient) { }

  //This function load the data from the json file
  loadQuestionsData():Observable<Question[]> {
    console.log("In service...");
    return this.http.get<Question[]>("assets/question.json");
}
}
