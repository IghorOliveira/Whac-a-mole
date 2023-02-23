const squares = document.querySelectorAll('.square');
let mole;
const score = document.querySelector('#score');
const time = document.querySelector('#time-left');
const btnRestart = document.querySelector('#restart');
const btnStop = document.querySelector('#stop');
const btnStart = document.querySelector('#start');
let timerId = null;
let countdownTimerId = null;
const highscore = document.querySelector('.highscore');


function startGame(){
    removeMole(2);
    time.textContent = '10';
    score.textContent = '0';
    countdownTimerId = setInterval(countDown, 1000);
    moveMole();
    timerId = setInterval(moveMole, 850);
    btnStart.removeEventListener('click', startGame);
}

function whacked(){
    score.textContent = parseInt(score.textContent) + 1; 
    moveMole();
}

function moveMole(){
    removeMole(2);
    let randomNumber = Math.floor(Math.random() * squares.length);
    console.log(randomNumber);
    squares[randomNumber].classList.add('mole');
    mole = document.querySelector('.mole');
    mole.addEventListener('click', whacked);
}



function countDown(){
    if(parseInt(time.textContent) > 0){
        time.textContent =  parseInt(time.textContent) - 1;
    } else {
        stopGame();
        checkHighscore();
        alert('Gameover! your final score is: '+ score.textContent);
    }
    
}

function removeMole(event){
    if(event == 1){
        squares.forEach(square => {
            square.removeEventListener('click', whacked);
        });
    } else {
        squares.forEach(square => {
            square.classList.remove('mole');
            square.removeEventListener('click', whacked);
        });
    }
    
}

function stopGame(){
    clearInterval(countdownTimerId);
    clearInterval(timerId);
    removeMole(1);
    btnStart.addEventListener('click', startGame);
}

function checkHighscore(){
    if(highscore == 0){
        highscore.textContent = score.textContent;
    } else if(parseInt(score.textContent) > parseInt(highscore.textContent)){
        highscore.textContent = score.textContent;
    }
}


btnRestart.addEventListener('click', startGame);
btnStop.addEventListener('click', stopGame);
btnStart.addEventListener('click', startGame);



