import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'babe-smash';

  fakeDatabase = [
    {
      "name": "Iga Wyrwal",
      "img": "5fsdfgdg.jpg",
      "rating": 10
    },
    {
      "name": "Lucy Pinder",
      "img": "fdsf7g8sdf.jpg",
      "rating": 10
    },
    {
      "name": "Kate Upton",
      "img": "k3ts7g.jpeg",
      "rating": 10
    },
    {
      "name": "Jordan Carver",
      "img": "2gd234fgd.jpg",
      "rating": 10
    },
    {
      "name": "Iga Wyrwal - 2",
      "img": "sfd8gtg.jpg",
      "rating": 10
    },
    {
      "name": "Lucy Pinder - 2",
      "img": "gyd8fgtdg.jpeg",
      "rating": 10
    },
    {
      "name": "Michelle Marsh",
      "img": "fdsgtdfs8t.jpeg",
      "rating": 10
    },
    {
      "name": "Doutzen Kroes",
      "img": "efgfdft.jpg",
      "rating": 10
    }
  ];

  total_girls = 0; 

  twoGirlsData = []; 

  ea = 0;
  eb = 0;
  face_a_new_rating = 0;
  face_b_new_rating = 0;
  k = 24;  

  ngOnInit(){
    //get total_girls count from database
    this.total_girls = this.fakeDatabase.length;
    this.loadNewGirls();
  }

  chooseTwoRandomGirls() { 
    let random_a = Math.floor((Math.random() * this.total_girls) + 1);
    let random_b = Math.floor((Math.random() * this.total_girls) + 1);
    
    while(random_a == random_b){
      random_b = Math.floor((Math.random() * this.total_girls) + 1);
    }  

    let twoGirls : number[] = [random_a,random_b];
    return twoGirls;    
  }

  getGirlData(girl) {
    //get girl's data from database
    girl = girl - 1;
    let girlData = this.fakeDatabase[girl];
    let data = [{
      "id": girl,
      "name": girlData["name"],
      "rating": girlData["rating"],
      "img": girlData["img"] 
    }]; 
    return data[0]; 
  }

  loadNewGirls() {
    let twoGirls = this.chooseTwoRandomGirls(); 

    this.twoGirlsData = [];

    for (let girl in twoGirls) { 
      this.twoGirlsData.push(this.getGirlData(twoGirls[girl]));
    }  

    //updates DOM on array change
  }

  voteForGirl(girl_chosen){ 
    console.log(girl_chosen);

    let newRatings = this.calculateRatings(girl_chosen);

    //update girl's ratings in database
    let girl_a = this.twoGirlsData[0]["id"]
    let girl_b = this.twoGirlsData[1]["id"]

    this.fakeDatabase[girl_a].rating = newRatings[0];
    this.fakeDatabase[girl_b].rating = newRatings[1];

    console.log(this.fakeDatabase);

    //upload two new girls
    this.loadNewGirls();
  }

  calculateRatings(girl_chosen) {                 
    let ea = 1/(1+10^((this.twoGirlsData[0]["rating"] - this.twoGirlsData[1]["rating"])/400));
    let eb = 1/(1+10^((this.twoGirlsData[1]["rating"] - this.twoGirlsData[0]["rating"])/400));

    let face_a_new_rating = 0;
    let face_b_new_rating = 0;

    if(girl_chosen == 0) {
      face_a_new_rating = this.twoGirlsData[0]["rating"] + (this.k * ea);
      face_b_new_rating = this.twoGirlsData[1]["rating"] - (this.k * eb);
    } else {
      face_a_new_rating = this.twoGirlsData[0]["rating"] - (this.k * ea);
      face_b_new_rating = this.twoGirlsData[1]["rating"] + (this.k * eb);
    }

    return [face_a_new_rating, face_b_new_rating];
  }
}
