const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");

holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let holdValue = 0;
let score = [0,0];
let player = 0;
const turnScore = ["p1-score","p2-score"];
const turnHold = ["p1-hold","p2-hold"];
const turnSignal = ["Player-1 turn!","Player-2 turn!"]
const resultSignal = ["Player-1 won!","Player-2 won!"]

function hold() {
  score[player] += holdValue;
  document.getElementById(turnScore[player]).style.width = score[player] + "%";
  document.getElementById(turnScore[player]).setAttribute("aria-valuenow", score[player]);
  document.getElementById(turnScore[player]).innerText = score[player];
  holdValue = 0;
  displayHoldValue();
  switchPlayer();
}

function roll() {

  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue - 1) + "; ";
  const die = document.getElementById("die");
  die.innerHTML = output;

  //if die returns 1, switch player. Otherwise proceed as usual
  if (faceValue === 1){
    holdValue = 0;
    displayHoldValue();
    switchPlayer();
  }
  else {
    holdValue += faceValue;
    if ((score[player] + holdValue) >= 100){
      gameOver();
      holdValue =0;
    }
    displayHoldValue();
  }
}

function switchPlayer(){
  player = player === 0 ? 1 : 0;
  document.getElementById("result").innerText = turnSignal[player];
}

function displayHoldValue(){
  document.getElementById(turnHold[player]).style.width = holdValue + "%";
  document.getElementById(turnHold[player]).setAttribute("aria-valuenow", holdValue);
  document.getElementById(turnHold[player]).innerText = holdValue;
}

//set up all atributes when game is over: color change, disabled button, etc.
function gameOver(){
  document.getElementById(turnScore[player]).style.width = 100 + "%";
  document.getElementById(turnScore[player]).setAttribute("class","progress-bar bg-success");
  document.getElementById(turnScore[player]).setAttribute("aria-valuenow", 100);
  document.getElementById(turnScore[player]).innerText = "100 🎉"; 
  document.getElementById("result").innerText = resultSignal[player];
  document.getElementById("roll").disabled = true;
  document.getElementById("hold").disabled = true;
}