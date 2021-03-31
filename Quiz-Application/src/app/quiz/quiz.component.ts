import { Component, OnInit } from '@angular/core';
import { Question } from "../question.model";
import { QuizService } from "../quiz.service";
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  flag1:boolean = true;
  flag2:boolean = false;
  flag3:boolean = false;
  msg:string = "";
  answer:string ="";
  questionNumber = 0;
  answered:number = 0;
  correct:number = 0;
  quizAnswers:Array<string> = ["","","","","","","","","",""];
  quizQuestions:Array<Question> = [];
  currentQuestion: Question = new Question("When did Germany invade the USSR?","May 1941","May 1940","June 1941", "c");
  
  //DI : pull the object from container. 
  constructor(public service:QuizService) { }

  ngOnInit(): void {
    this.service.loadQuestionsData().subscribe(data=> this.quizQuestions=data);
    console.log("In quiz.component. data loaded!")

  }

  goToQuiz(){
    this.flag1 = !this.flag1;
    this.flag2 = !this.flag2;
  }

   //this function go to the previous question
   prevQuestion(){
    if(this.questionNumber > 0)
    {
       this.msg = "";
       this.questionNumber--;
       this.currentQuestion = this.quizQuestions[this.questionNumber];
    }
    else
    {
      this.msg = "This is the first question. Click next to go to the next question...";
    }
   }


  //this function go to the next question
  nextQuestion(){
   if(this.questionNumber < 9)
   {
      this.msg = "";
      this.questionNumber++;
      this.currentQuestion = this.quizQuestions[this.questionNumber];  
      //userRef.controls['a'].reset();
   }
   else
   {
     this.msg = "You reached the end of this quiz. Click finish to see your report...";
   }
  }


  //This function save the answer
  saveAnswer(value:any)
  {
    this.quizAnswers[this.questionNumber] = value.a;
    console.log(" Value is : ", value.a );
    this.nextQuestion();
    //value = null;
    //document.getElementById('ans1').checked = false;
  }

  //This function check all answered question
  totalAnswered()
  {
    this.answered = 0;
    for(let i=0; i<10; i++)
    {
      if(this.quizAnswers[i] != "")
        this.answered++;
    }
  }

   //This function check all correct answer
   correctAnswered()
   {
     this.correct = 0;
     for(let i=0; i<10; i++)
     {
       if(this.quizAnswers[i] == this.quizQuestions[i].correct)
         this.correct++;
     }
   }

   //this function make the user take the quiz again
   takeAgain()
   {
      this.flag1 = !this.flag1;
     // this.flag2 = !this.flag2;
      this.flag3 = !this.flag3;
      this.questionNumber = 0;
      this.answered = 0;
      this.correct = 0;
      this.msg = "";
      this.quizAnswers = ["","","","","","","","","",""];
      this.currentQuestion = new Question("When did Germany invade the USSR?","May 1941","May 1940","June 1941", "c");
  
   }


   //this function give the quiz report
  finish()
  {
    this.flag2 = !this.flag2;
    this.flag3 = !this.flag3;
   // let ans = prompt("Are you sure you want to submit this quiz? y / n")
   // if(ans == "y")
   // {
      this.totalAnswered();
      this.correctAnswered();
   // }
    
  }
}
