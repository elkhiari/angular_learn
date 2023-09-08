import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newMembreName : string = '';
  membres : string[] = [];
  error : string = '';
  teamNumber : number | "" = "";
  teams : string[][] = [[]];

  storeMembre(membre : string) {
    this.newMembreName = membre;
  }

  storeTeamNumber(teamNumber : string) {
    this.teamNumber = Number(teamNumber);
  }

  addMembre() {
    if (this.newMembreName == "") {
      this.error = 'Name must be at least 3 characters long.';
      return;
    }
    this.error = '';
    this.membres.push(this.newMembreName);
    this.newMembreName = '';
  }

  reset() { 
    this.membres = [];
    this.error = '';
    this.newMembreName = '';
  }

  generateNumber(size : number) {
    return Math.floor(Math.random() * size);
  }


  generateTeams() {
    if (this.membres.length == 0 ) {
      this.error = 'Please enter at least one member.';
      return;
    }
    if(this.teamNumber === "" || this.teamNumber <= 0 ) {
      this.error = 'Please enter a valid number of teams.';
      return;
    }
    let teamSize = this.membres.length / this.teamNumber;
    if(teamSize < 1) {
      this.error = "Please enter a number of teams that is less than the number of members."
      return;
    }

    this.teams = [[]]
    const allMembers = [...this.membres];
    
    while(allMembers.length){
      for(let i = 0; i < this.teamNumber; i++ ) {
        const randomIndex = this.generateNumber(allMembers.length);
        const mamb = allMembers.splice(randomIndex,1)[0];
        if(!mamb) break;
        this.teams[i]?this.teams[i].push(mamb):this.teams[i] = [mamb]
      }
    }
    
    this.error = ""
    this.membres = []
    this.teamNumber = ""
  }
}
