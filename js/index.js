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

plus.onclick = () => {
    momentalniHodnota += textPole.value + "+"
    // vypisuje do labelu aktuální hodnotu
    hodnota.innerHTML = momentalniHodnota
    textPole.value = ""
}

minus.onclick = () => {
    momentalniHodnota += textPole.value + "+"
    // vypisuje do labelu aktuální hodnotu
    hodnota.innerHTML = momentalniHodnota
    textPole.value = ""
}

vysledek.onclick = () => {
    momentalniHodnota += textPole.value
    hodnota.innerHTML = momentalniHodnota

    let result = looseJsonParse(momentalniHodnota)
    textPole.value = result
    momentalniHodnota = ""
}