import { guesses } from './guesses.js';
import { answers } from './answers.js';
const keys = document.getElementsByClassName('keys');
const row1 = document.getElementsByClassName('tile1');
const row2 = document.getElementsByClassName('tile2');
const row3 = document.getElementsByClassName('tile3');
const row4 = document.getElementsByClassName('tile4');
const row5 = document.getElementsByClassName('tile5');
const row6 = document.getElementsByClassName('tile6');
const enter = document.getElementById('enter');
const remove = document.getElementById('delete');
const alerter = document.getElementById('alert');
const btn = document.getElementsByClassName('btn');
const restart = document.getElementById('restart');
const restart_show = document.getElementById('end');
const restart_text = document.getElementById('restart_text');
const numTotalWins = document.getElementById('totalWins');
const winPerc = document.getElementById('winPerc');
const statistics = document.getElementById('statistics');
const statbox = document.getElementById('stat');

// tryStat
let firstTries = parseInt(localStorage.getItem('firstTriesL')) || 0;
const first = document.getElementById('firstTry');
first.innerHTML = firstTries;

let secondTries = parseInt(localStorage.getItem('secondTriesL')) || 0;
const second = document.getElementById('secondTry');
second.innerHTML = secondTries;

let thirdTries = parseInt(localStorage.getItem('thirdTriesL')) || 0;
const third = document.getElementById('thirdTry');
third.innerHTML = thirdTries;

let fourthTries = parseInt(localStorage.getItem('fourthTriesL')) || 0;
const fourth = document.getElementById('fourthTry');
fourth.innerHTML = fourthTries;

let fifthTries = parseInt(localStorage.getItem('fifthTriesL')) || 0;
const fifth = document.getElementById('fifthTry');
fifth.innerHTML = fifthTries;

let sixthTries = parseInt(localStorage.getItem('sixthTriesL')) || 0;
const sixth = document.getElementById('sixthTry');
sixth.innerHTML = sixthTries;

//refresh webpage
function restarter() {
    window.location.reload();
}

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', tempWarning);

    function tempWarning() {
        alert('its wordle, just to infinity.');
    }
}

let visCount = 0;
statistics.addEventListener('click', showStats);
function showStats() {
    if (visCount % 2 === 0) {
        statbox.style.visibility = 'visible';
        visCount += 1;
    } else {
        statbox.style.visibility = 'hidden';
        visCount += 1;
    }
}

let wordle = '';

let winner = false;

let keys_strings = [];
for (let i = 0; i < keys.length; i++) {
    keys_strings.push(keys[i].innerText);
}

const rows = [row1, row2, row3, row4, row5, row6];
let row_count = 0;

// Stat
let games = parseInt(localStorage.getItem('gamesPlayed')) || 0;
localStorage.setItem('gamesPlayed', games);
const numGamesPlayed = document.getElementById('gamesPlayed');
numGamesPlayed.innerText = games;
let wins = parseInt(localStorage.getItem('totalWins')) || 0;
numTotalWins.innerText = wins;
let winPercentage = (parseFloat(wins) / parseFloat(games)) * 100;
winPerc.innerText = winPercentage.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%';
console.log(games);
function makeWordle() {
    let random = Math.floor(Math.random() * 2316);
    wordle = answers[random].toUpperCase();
}

makeWordle();

let count = 0;
// adds event listeners to the keys, listens for click to add text to the correct tile.
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', call);

    document.onkeyup = logKey;
    function logKey(e) {
        if (winner === false) {
            if (e.key === 'Backspace') {
                rows[row_count][count - 1].innerHTML = '';
                rows[row_count][count - 1].classList.remove('bounce');
                count -= 1;
            } else if (e.key === 'Enter') {
                check();
            } else {
                const newIndex = keys_strings.indexOf(e.key.toUpperCase());
                rows[row_count][count].innerHTML = keys[newIndex].innerHTML;
                rows[row_count][count].classList.add('bounce');
                count += 1;
            }
        }
    }

    function call() {
        rows[row_count][count].innerHTML = keys[i].innerHTML;
        rows[row_count][count].classList.add('bounce');
        count += 1;
    }
}

enter.addEventListener('click', check);
// function to check the attempted word, and give the feedback (green for right, yellow for partial, and gray for wrong)
function check() {
    let guess = '';
    for (let i = 0; i < rows[row_count].length; i++) {
        guess = guess + rows[row_count][i].innerHTML;
    }
    if (guesses.includes(guess.toLowerCase())) {
        for (let i = 0; i < rows[row_count].length; i++) {
            if (wordle[i] === rows[row_count][i].innerHTML) {
                rows[row_count][i].classList.add('correct', 'flip_correct');
                rows[row_count][i].classList.remove('bounce');
                const index = keys_strings.indexOf(rows[row_count][i].innerText);
                setTimeout(() => {
                    keys[index].style.backgroundColor = '#538d4e';
                }, 660);
            } else if (
                wordle[0] === rows[row_count][i].innerHTML ||
                wordle[1] === rows[row_count][i].innerHTML ||
                wordle[2] === rows[row_count][i].innerHTML ||
                wordle[3] === rows[row_count][i].innerHTML ||
                wordle[4] === rows[row_count][i].innerHTML
            ) {
                rows[row_count][i].classList.add('contains', 'flip_contains');
                rows[row_count][i].classList.remove('bounce');
                const index = keys_strings.indexOf(rows[row_count][i].innerText);
                setTimeout(() => {
                    keys[index].style.backgroundColor = '#b59f3b';
                }, 660);
            } else {
                rows[row_count][i].classList.add('wrong', 'flip_wrong');
                rows[row_count][i].classList.remove('bounce');
                const index = keys_strings.indexOf(rows[row_count][i].innerText);
                setTimeout(() => {
                    keys[index].style.backgroundColor = '#3a3b3d';
                }, 660);
            }
        }
        row_count += 1;
        if (row_count === 1) {
            games += 1;
            localStorage.setItem('gamesPlayed', games);
            winPercentage = (parseFloat(wins) / parseFloat(games - 1)) * 100;
            winPerc.innerText = winPercentage.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%';
        }
        count = 0;

        if (guess === wordle) {
            alerter.classList.remove('base');
            wins += 1;
            localStorage.setItem('totalWins', wins);

            //stats
            if (row_count === 1) {
                const first = document.getElementById('firstTry');
                firstTries += 1;
                first.innerHTML = firstTries;
                localStorage.setItem('firstTriesL', firstTries);
            } else if (row_count === 2) {
                const second = document.getElementById('secondTry');
                secondTries += 1;
                second.innerHTML = secondTries;
                localStorage.setItem('secondTriesL', secondTries);
            } else if (row_count === 3) {
                const third = document.getElementById('thirdTry');
                thirdTries += 1;
                third.innerHTML = thirdTries;
                localStorage.setItem('thirdTriesL', thirdTries);
            } else if (row_count === 4) {
                const fourth = document.getElementById('fourthTry');
                fourthTries += 1;
                fourth.innerHTML = fourthTries;
                localStorage.setItem('fourthTriesL', fourthTries);
            } else if (row_count === 5) {
                const fifth = document.getElementById('fifthTry');
                fifthTries += 1;
                fifth.innerHTML = fifthTries;
                localStorage.setItem('fifthTriesL', fifthTries);
            } else if (row_count === 6) {
                const sixth = document.getElementById('sixthTry');
                sixthTries += 1;
                sixth.innerHTML = sixthTries;
                localStorage.setItem('sixthTriesL', sixthTries);
            }

            setTimeout(() => {
                restart_show.classList.remove('endOpacity');
                restart_text.style.color = '#538d4e';
                restart_text.innerText = 'You won! Your guess was ' + wordle;
                restart_show.classList.add('showFinal');
                restart.addEventListener('click', restarter);
            }, 1800);
            for (let i = 0; i < keys.length; i++) {
                keys[i].disabled = true;
                enter.disabled = true;
                remove.disabled = true;
                winner = true;
            }
        } else if (row_count === 6) {
            setTimeout(() => {
                restart_show.classList.remove('endOpacity');
                restart_text.style.color = '#a54b4b';
                restart_text.innerText = 'You ran out of tries. The answer was ' + wordle;
                restart_show.classList.add('showFinal');
                restart.addEventListener('click', restarter);
            }, 1800);
        }
    } else {
        alerter.classList.remove('base');
        alerter.innerText = 'Not a word';
        alerter.classList.add('alert_error');
        setTimeout(() => {
            alerter.classList.remove('alert_error');
            alerter.innerText = '';
        }, 2500);
    }
}

// remove button
remove.addEventListener('click', removed);

function removed() {
    rows[row_count][count - 1].innerHTML = '';
    rows[row_count][count - 1].classList.remove('bounce');
    count -= 1;
}

// if person guesses two of the same letter but one of the letters is in the right position, and the answer only has one of those letters, make the other letter grayed
// express that in keys too ^^^
