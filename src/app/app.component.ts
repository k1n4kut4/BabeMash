import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'babe-smash';

  voteForGirl(girl_chosen){
    console.log(girl_chosen);
  }
}
