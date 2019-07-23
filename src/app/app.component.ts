import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'babe-smash';
  random_a = 0;
  random_b = 0;

  chooseTwoRandomGirls(){
    let total_girls = 2;
    this.random_a = Math.floor((Math.random() * total_girls) + 1);
	  this.random_b = Math.floor((Math.random() * total_girls) + 1);

    while(this.random_a == this.random_b){
      this.random_b = Math.floor((Math.random() * total_girls) + 1);
    } 
  }

  voteForGirl(girl_chosen){
    console.log(girl_chosen);
  }

  calculateRatings() {
    



  }
}
