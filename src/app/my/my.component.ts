import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  numbers: number[];
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.reactiveMethod().subscribe(data => {
      this.numbers = data;
    });
    this.appService.clickerLogger.subscribe(data => {
      console.log(data);
      if (data) {
        setTimeout(() => {
          this.changeNumbers();
        }, 500);
      }
    });
  }

  changeNumbers() {
    this.numbers = this.numbers.reverse();
  }

  fireObservable() {
    this.appService.clickerLogger.next(new Date());
  }
}
