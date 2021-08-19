import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion, QUESTIONS } from '../question';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  questions = QUESTIONS;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick(question: IQuestion): void {
    this.router.navigate(['question', question.no], { state: { question }})
  }

}
