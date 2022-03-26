window.onload=function(){
  let userScore = 0;
  let compScore = 0; 

  const userScore_span = document.getElementById("user-score");
  const compScore_span = document.getElementById("comp-score");
  const scoreBoard_div = document.querySelector(".scoreboard");
  const result_div = document.querySelector(".result");  
  const rock_div = document.getElementById("r");
  const paper_div = document.getElementById("p");
  const scissors_div = document.getElementById("s");  

  main(); 
  
function game(userChoice){
  const computerChoice = getComputerChoice();
  
  switch(userChoice+computerChoice){
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice); 
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
        
  }
}

function convertToWord(choice){
  if(choice == 'r'){
    return "Rock";
  }
  else if(choice == 'p'){
    return "Paper";
  }
  else{
    return "Scissors";
  }
}

function win(userChoice, computerChoice){
  userScore++;  
  userScore_span.innerHTML = userScore; 
  compScore_span.innerHTML = compScore; 
  const smallUser = "user".fontsize(1).sub();
  const smallComp = "comp".fontsize(1).sub();
  result_div.innerHTML = convertToWord(userChoice) + smallUser + " beats " + convertToWord(computerChoice) +smallComp+ " > You win!! ";
  document.getElementById(userChoice).classList.add('green-glow');
  setTimeout(function(){
    document.getElementById(userChoice).classList.remove('green-glow');
  }, 650);
}

function lose(userChoice, computerChoice){
  compScore++; 
  userScore_span.innerHTML = userScore; 
  compScore_span.innerHTML = compScore; 
  const smallUser = "user".fontsize(1).sub();
  const smallComp = "comp".fontsize(1).sub();
  result_div.innerHTML = convertToWord(computerChoice) + smallComp + " beats " + convertToWord(userChoice) + smallUser + " > You lose... ";
  document.getElementById(userChoice).classList.add('red-glow');
  setTimeout(function(){
    document.getElementById(userChoice).classList.remove('red-glow');
  }, 650);
}

function draw(userChoice, computerChoice){
  const smallUser = "user".fontsize(1).sub();
  const smallComp = "comp".fontsize(1).sub();
  result_div.innerHTML = convertToWord(computerChoice) + smallComp + " draws with " + convertToWord(userChoice) + smallUser + " > Its a tie. ";
  document.getElementById(userChoice).classList.add('dark-glow');
  setTimeout(function(){
    document.getElementById(userChoice).classList.remove('dark-glow');
  }, 650);
}

function getComputerChoice(){
  const choices = ['r', 'p', 's'];
  const randomNumber = Math.floor(Math.random()*3);
  return choices[randomNumber];
}

function main() {
  rock_div.addEventListener('click', function(){
    game("r");
  })
  paper_div.addEventListener('click', function(){
    game("p");
  })
  scissors_div.addEventListener('click', function(){
    game("s");
  })
}
}
