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

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', tempWarning);

    function tempWarning() {
        alert('does not work yet, soon.');
    }
}

let wordle = answers[0].toUpperCase();

let winner = false;

let keys_strings = [];
for (let i = 0; i < keys.length; i++) {
    keys_strings.push(keys[i].innerText);
}

const rows = [row1, row2, row3, row4, row5, row6];
let row_count = 0;

function makeWordle() {
    let random = Math.floor(Math.random() * 2316);
    wordle = answers[random].toUpperCase();
}

function resetAtMidnight() {
    var now = new Date();
    var night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    var msToMidnight = night.getTime() - now.getTime();

    setTimeout(function () {
        makeWordle();
        resetAtMidnight();
    }, msToMidnight);
}

resetAtMidnight();

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
        count = 0;

        if (guess === wordle) {
            alerter.classList.remove('base');
            alerter.innerText = 'Winner';
            alerter.classList.add('alert_winner');
            for (let i = 0; i < keys.length; i++) {
                keys[i].disabled = true;
                enter.disabled = true;
                remove.disabled = true;
                winner = true;
            }
            // setTimeout(() => {
            //     alerter.classList.remove('alert_winner');
            //     alerter.innerText = '';
            // });
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
