import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'babe-smash';

  total_girls = 0;

  random_a = 0;
  random_b = 0;

  twoGirlsData = [];

  girl_chosen = '';

  ea = 0;
  eb = 0;
  face_a_new_rating = 0;
  face_b_new_rating = 0;
  k = 24;  

  ngOnInit(){
    //get total_girls count from database

    this.loadNewGirls();
  }

  chooseTwoRandomGirls() {
    this.total_girls = 2;

    this.random_a = Math.floor((Math.random() * this.total_girls) + 1);
	  this.random_b = Math.floor((Math.random() * this.total_girls) + 1);

    while(this.random_a == this.random_b){
      this.random_b = Math.floor((Math.random() * this.total_girls) + 1);
    } 

    let twoGirls : string[] = ["a","b"];
    return twoGirls;    
  }

  getGirlData(girl) {
    //get girl's data from database

    let data : string[] = ["a","b"];
    return data; 
  }

  loadNewGirls() {
    let twoGirls = this.chooseTwoRandomGirls();

    for (let girl in twoGirls) {
      this.twoGirlsData.push(this.getGirlData(girl));
    } 
  }

  voteForGirl(girl_chosen){
    this.girl_chosen = girl_chosen;
    console.log(girl_chosen);

    this.calculateRatings();

    //update girl's ratings in database
  }

  calculateRatings() {                 
    this.ea = 1/(1+10^((this.twoGirlsData[0]["rating"] - this.twoGirlsData[1]["rating"])/400));
    this.eb = 1/(1+10^((this.twoGirlsData[1]["rating"] - this.twoGirlsData[0]["rating"])/400));

    if(this.girl_chosen == "a") {

      this.face_a_new_rating = this.twoGirlsData[0]["rating"] + (this.k * this.ea);
      this.face_b_new_rating = this.twoGirlsData[1]["rating"] - (this.k * this.eb);

    } else {

      this.face_a_new_rating = this.twoGirlsData[0]["rating"] - (this.k * this.ea);
      this.face_b_new_rating = this.twoGirlsData[1]["rating"] + (this.k * this.eb);

    }
  }
}
