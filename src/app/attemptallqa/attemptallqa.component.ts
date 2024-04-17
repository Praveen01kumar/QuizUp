import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api-service';

@Component({
  selector: 'app-attemptallqa',
  templateUrl: './attemptallqa.component.html',
  styleUrls: ['./attemptallqa.component.scss']
})
export class AttemptallqaComponent implements OnInit {
  questionsList: any = [];
  questionIndex: number = 0;
  constructor(private apiService: ApiService) { }
  counter: number = 60;
  interval$: any;
  isQuizCompleted: boolean = false;
  quiz_time: number = 0;
  isQuizSubmitted: boolean = false;
  testResult: any;
  quizData: any;


  ngOnInit(): void {
    this.getAllQuestions();
    this.checkAttempted();
    setInterval(() => {
      this.questionsList[this.questionIndex].left_time--;
      if (this.quiz_time > 0) {
        this.quiz_time = this.quiz_time - 1000;
      }
      if (this.questionsList[this.questionIndex].left_time === 0) {
        this.questionIndex++;
      }
    }, 1000);
  }

  checkAttempted() {
    const getToken: any = localStorage.getItem('user_token');
    const token = JSON.parse(getToken);
    this.isQuizSubmitted = token?.isAttempted;
  }

  getAllQuestions() {
    this.apiService.getQuestions().subscribe((res: any) => {
      this.questionsList = res?.questions;
      this.quiz_time = res.quiz_time;
      this.quizData = res;
    });
  }

  getnext() {
    if (this.questionIndex < (this.questionsList.length - 1)) {
      this.questionIndex++;
    }
  }

  getprevius() {
    if (this.questionIndex > 0) {
      this.questionIndex--;
    }
  }

  attemed(index: number, option: any) {
    const selected_item = this.questionsList[index];
    if (this.questionsList[this.questionIndex]?.left_time > 0) {
      if (!selected_item?.attempted) {
        this.questionsList[index].attempted = true;
        setTimeout(() => { this.getnext(); }, 1000);
        this.questionsList[index].attemptedop = option;
        if (option?.answer) {
          this.questionsList[index].correct = true;
        }
      }
    }
  }

  quizTimeLeft(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  submitQuiz() {
    this.isQuizSubmitted = true;
    const getToken: any = localStorage.getItem('user_token');
    const token = JSON.parse(getToken);

    let attempted = 0;
    let correct = 0;
    let marks = 0;
    let total_marks = 0;

    this.questionsList.forEach((element: any) => {
      if (element?.attempted) { attempted++; }
      if (element?.correct) { correct++; }
      if (element?.marks) { total_marks = total_marks + element?.marks; }
      if (element?.correct && element?.marks) { marks = marks + element?.marks; }
    });

    this.testResult = {
      attempted: attempted,
      correct: correct,
      time_taken: this.quizTimeLeft(this.quizData?.quiz_time - this.quiz_time),
      marks: marks,
      name: token?.usermail?.match(/^([^@]*)@/)[1],
      grade: this.calculateGrade(marks, total_marks),
      total_qa: this.questionsList?.length,
      total_marks: total_marks,
      not_attempted: this.questionsList?.length - attempted,
      status: this.calculateGrade(marks, total_marks) === 'F' ? 'Fail' : 'Pass',
      total_time: this.quizTimeLeft(this.quizData?.quiz_time)
    };
    localStorage.setItem('user_token', JSON.stringify({ ...token, isAttempted: true }));
  }

  calculateGrade(obtainedMarks: number, totalMarks: number): any {
    if (obtainedMarks && totalMarks) {
      const percentage = (obtainedMarks / totalMarks) * 100;
      if (percentage >= 95) { return "A+"; } else if (percentage >= 90) { return "A"; } else if (percentage >= 85) { return "B+"; } else if (percentage >= 80) { return "B"; } else if (percentage >= 75) { return "C+"; } else if (percentage >= 70) { return "C"; } else if (percentage >= 65) { return "D+"; } else if (percentage >= 60) { return "D"; } else { return "F"; };
    } else {
      return "F";
    }
  }


}
