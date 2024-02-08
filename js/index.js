let textPole = document.getElementById("pole")
let plus = document.getElementById("plus")
let minus = document.getElementById("minus")
let vysledek = document.getElementById("vysledek")

let hodnota = document.getElementById("momentalniHodnota")
// momentalniHodnota.innerHTML = 10 + 10

let momentalniHodnota = ""

function looseJsonParse(obj) {
    return eval?.(`"use strict";(${obj})`);
}

// Zabranuje použití všech kláves krom čísel a +,-,*,...
textPole.addEventListener('keydown', function(event) {
    // Regulární výraz pro povolené znaky (čísla 0-9, +, -, *, /, %)
    if (!/[0-9\+\-\*\/%]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
    }
});

function pridejOperator(operator) {
    if (textPole.value !== "") {
        momentalniHodnota += textPole.value + operator
        // vypisuje do labelu aktuální hodnotu
        hodnota.innerHTML = momentalniHodnota
        textPole.value = ""
    }
}

function reset() {
    momentalniHodnota = ""
    hodnota.innerHTML = ""
    textPole.value = ""
}

// plus.onclick = () => {
//     momentalniHodnota += textPole.value + "+"
//     // vypisuje do labelu aktuální hodnotu
//     hodnota.innerHTML = momentalniHodnota
//     textPole.value = ""
// }

// minus.onclick = () => {
//     momentalniHodnota += textPole.value + "-"
//     // vypisuje do labelu aktuální hodnotu
//     hodnota.innerHTML = momentalniHodnota
//     textPole.value = ""
// }

vysledek.onclick = () => {
    if (textPole.value.match(/\+\-\*\//)) {
        momentalniHodnota = textPole.value
        hodnota.innerHTML = momentalniHodnota

        let result = looseJsonParse(momentalniHodnota)
        textPole.value = result
        momentalniHodnota = ""
    }

    momentalniHodnota += textPole.value
    hodnota.innerHTML = momentalniHodnota

    let result = looseJsonParse(momentalniHodnota)
    textPole.value = result
    momentalniHodnota = ""
}

// .split(/[\+\-\*\/]/)