import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/shared/pipes/utils/utils';
import { IQuestion } from '../../question';
import { Question1 } from './question1';
import { Question2 } from './question2';
import { Question3 } from './question3';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})


export class QuestionComponent implements OnInit {
  sampleQuestion: IQuestion;
  variations: IQuestion[] = [];
  counter = 20;
  isSubmitted = true;

  constructor(
    private router: Router
  ) {
    this.sampleQuestion = this.router.getCurrentNavigation()?.extras?.state?.question;
    if (!this.sampleQuestion) {
      this.backToMenu();
    }
    this.generateQuestion(this.counter);
  }

  ngOnInit(): void {
  }

  generateQuestion(counter: number): void {
    for (let index = 0; index < counter; index++) {
      switch (this.sampleQuestion.no) {
        case 1:
          this.variations.push(Question1.generateVariation(index+1));
          break;
        case 2:
          this.variations.push(Question2.generateVariation(index+1));
          break;
        case 3:
          this.variations.push(Question3.generateVariation(index+1));
          break;
        default:
          break;
      }
    }
  }

  backToMenu(): void {
    this.router.navigate(['menu']);
  }
}
