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

  girl_chosen = '';

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

    for (let girl in twoGirls) { 
      this.twoGirlsData.push(this.getGirlData(twoGirls[girl]));
    }  

    //need to update DOM

    
  }

  voteForGirl(girl_chosen){
    this.girl_chosen = girl_chosen;
    console.log(girl_chosen);

    this.calculateRatings();

    //update girl's ratings in database
    let girl_a = this.twoGirlsData[0]["id"]
    let girl_b = this.twoGirlsData[1]["id"]

    this.fakeDatabase[girl_a].rating = this.ea;
    this.fakeDatabase[girl_b].rating = this.eb;

    console.log(this.fakeDatabase);

    //upload two new girls
    this.loadNewGirls();
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

    console.log(this.face_a_new_rating);
    console.log(this.face_b_new_rating);
  }
}
