import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  userScore: number;
  compScore: number;
  userScore_span: any;
  compScore_span: any;
  scoreBoard_div: any;
  result_div: any;
  rock_div: any;
  paper_div: any;
  scissors_div: any;
  backend_message: any;

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {
    this.userScore_span = document.getElementById("user-score");
    this.compScore_span = document.getElementById("comp-score");
    this.scoreBoard_div = document.querySelector(".scoreboard");
    this.result_div = document.querySelector(".result");
    this.rock_div = document.getElementById("r");
    this.paper_div = document.getElementById("p");
    this.scissors_div = document.getElementById("s");
    this.userScore = 0;
    this.compScore = 0;
    console.log("Using Environment:" + this.apiURL)
  }
  

  contact_backend(){
    // adding environment variable here
    this.http.get<any>(this.apiURL + '/contact').subscribe(response => {
            this.backend_message = response.success
            // console.log(data)
        })
    console.log(this.backend_message)
  }
  
  game(userChoice: any) {
    let computerChoice = this.getComputerChoice();
    switch (userChoice + computerChoice) {
      case "rs":
      case "pr":
      case "sp":
        this.win(userChoice, computerChoice);
        break;
      case "rp":
      case "ps":
      case "sr":
        this.lose(userChoice, computerChoice);
        break;
      case "rr":
      case "pp":
      case "ss":
        this.draw(userChoice, computerChoice);
        break;
    }
  }

  convertToWord(choice: any) {
    if (choice == 'r') {
      return "Rock";
    }
    else if (choice == 'p') {
      return "Paper";
    }
    else {
      return "Scissors";
    }
  }

  win(userChoice: any, computerChoice: any) {
    this.userScore++
    this.userScore_span.innerHTML = this.userScore;
    this.compScore_span.innerHTML = this.compScore;
    const smallUser = "user".fontsize(1).sub();
    const smallComp = "comp".fontsize(1).sub();
    this.result_div.innerHTML = this.convertToWord(userChoice) + smallUser + " beats " + this.convertToWord(computerChoice) + smallComp + " > You win!! ";

    var green_glow = document.getElementById(userChoice)!;
    if (green_glow) {
      green_glow.classList.add('green-glow')
    }

    setTimeout(function () {
      if (green_glow) {
        green_glow.classList.remove('green-glow')
      }
    }, 650);
  }

  lose(userChoice: any, computerChoice: any) {
    this.compScore++;
    this.userScore_span.innerHTML = this.userScore;
    this.compScore_span.innerHTML = this.compScore;
    const smallUser = "user".fontsize(1).sub();
    const smallComp = "comp".fontsize(1).sub();
    this.result_div.innerHTML = this.convertToWord(computerChoice) + smallComp + " beats " + this.convertToWord(userChoice) + smallUser + " > You lose... ";

    var red_glow = document.getElementById(userChoice)!;
    if (red_glow) {
      red_glow.classList.add('red-glow')
    }


    setTimeout(function () {
      if (red_glow) {
        red_glow.classList.remove('red-glow')
      }
    }, 650);


  }

  draw(userChoice: any, computerChoice: any) {
    const smallUser = "user".fontsize(1).sub();
    const smallComp = "comp".fontsize(1).sub();
    this.result_div.innerHTML = this.convertToWord(computerChoice) + smallComp + " draws with " + this.convertToWord(userChoice) + smallUser + " > Its a tie. ";

    var dark_glow = document.getElementById(userChoice)!;
    if (dark_glow) {
      dark_glow.classList.add('dark-glow')
    }
    setTimeout(function () {
      if (dark_glow) {
        dark_glow.classList.remove('dark-glow')
      }
    }, 650);
  }

  getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
  }

  main() {
    document.addEventListener('DOMContentLoaded', () => {
      this.rock_div.addEventListener('click', () => {
        this.game("r");
      })
      this.paper_div.addEventListener('click', () => {
        this.game("p");
      })
      this.scissors_div.addEventListener('click', () => {
        this.game("s");
      })
   }, false);
  }

}
