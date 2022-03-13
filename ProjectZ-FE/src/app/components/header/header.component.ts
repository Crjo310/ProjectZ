import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo: string = '/assets/images/Logo_2.png';

  constructor() { }

  ngOnInit(): void {
  }

}
