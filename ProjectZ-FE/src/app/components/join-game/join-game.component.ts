import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  progressbarValue : number = 0;
  curSec: number = 100;
  id!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startTimer(100)
  }

  startTimer(seconds: number){
    const time = seconds;
    const timer$ = interval(100);

    const sub = timer$.subscribe((sec) => {
      this.progressbarValue  =  sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
        var that = this;
        setTimeout(function(){
          that.progressbarValue = 101;
        },1500);
      }
    });
  }

  joinGame(){
    this.router.navigate(['/game/' + this.id]);
  }

}
