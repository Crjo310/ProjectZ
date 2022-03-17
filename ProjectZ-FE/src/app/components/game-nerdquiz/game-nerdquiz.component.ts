import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, Game, Question, Quizset } from 'src/app/model/models';
import { GameService } from 'src/app/service/game-service';

export interface Col {
  color: string;
}

@Component({
  selector: 'app-game-nerdquiz',
  templateUrl: './game-nerdquiz.component.html',
  styleUrls: ['./game-nerdquiz.component.css']
})
export class GameNerdquizComponent implements OnInit {

  cols: Col[] = [
    {color: 'blue'},
    {color: 'green'},
    {color: 'yellow'},
    {color: 'orange'},
    {color: 'red'},
  ];

  quizset!: Quizset;
  categories!: Category[];
  questions: Question[] = [];
  currentQuestion!: Question;
  showAnswer: boolean = false;

  constructor(private httpClient: HttpClient, private gameService: GameService) { }

  @Input() game!: Game;

  ngOnInit(): void {
    let path = this.isAdmin() ? "Nerdquiz_1_admin.json" : "Nerdquiz_1.json";
    this.httpClient.get("/assets/jsons/"+path).subscribe(
      (data) => {
        this.quizset = <Quizset>data;
        this.categories = this.quizset.categories;
        let i: number = 0;
        this.categories.forEach(
          (c) => {
            c.questions.forEach(
              (q) => {
                q.category = i;
                this.questions.push(q);
              }
            )
            i++;
          }
        )
        this.questions.sort((a,b) => a.points - b.points)
      }
    )
    this.gameService.game$.subscribe((game) => {
      this.game = game;
    });
  }

  showQuestion(question: Question){
    if (this.isAdmin()){
      this.gameService.sendActiveQuestion(question)
    }
  }

  showAnswerSwitch(){
    this.gameService.sendShowAnswerSwitch();
  }

  buzzerLockSwitch(){
    this.gameService.sendSwitchBuzzer();
  }

  isAdmin(): boolean{
    return this.game?.admin?.id == localStorage.getItem('userId');
  }

}
