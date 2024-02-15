let textPole = document.getElementById("pole")
let plus = document.getElementById("plus")
let minus = document.getElementById("minus")
let vysledek = document.getElementById("vysledek")

let hodnota = document.getElementById("momentalniHodnota")

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

    if (event.key === "Enter") {
        event.preventDefault();
        vypocitej()
    }

    //! ======== Nefunguje. =============
    //todo Je potřeba vymyslet script, který zabraní spamování operátorů do inputu (povolit pouze jeden) a poté ho uloží do historie a smaže z inputu jako to funguje při klakání na tlačítka.
    if (/[\+\-\*\/%]/.test(event.key) && textPole.value !== /[\+\-\*\/%]/.test(event.key)) {
        console.log("Zmačkl jsi " + event.key);
        if (textPole.value.match(/[\+\-\*\/%]/)) {
            return
        } else {
            event.preventDefault()
            pridejOperator(event.key)
            // textPole.value = ""
        }

    }

    
});

function pridejOperator(operator) {
    if (textPole.value !== "") {
        momentalniHodnota += textPole.value + operator
        // vypisuje do labelu aktuální hodnotu
        hodnota.innerHTML = momentalniHodnota
        console.log(1);
        textPole.value = ""
        console.log(2);
    }
}
function pridejOperatorKlavesa() {
    if (textPole.value !== "") {
        momentalniHodnota += textPole.value
        // vypisuje do labelu aktuální hodnotu
        hodnota.innerHTML = momentalniHodnota
        console.log(1);
        textPole.value = ""
        console.log(2);
    }
}

function pridejCislo(cislo) {
    textPole.value += cislo
}

function reset() {
    momentalniHodnota = ""
    hodnota.innerHTML = ""
    textPole.value = ""
}

function vypocitej() {
    if (textPole.value !== "") {
        if (textPole.value.match(/\+\-\*\//)) {
            console.log("ted");
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
    } else {
        console.log("Textové pole je prázdné! Napiš něco..");
    }
}

