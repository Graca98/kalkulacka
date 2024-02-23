let textPole = document.getElementById("pole")
let hodnota = document.getElementById("momentalniHodnota")

let momentalniHodnota = ""

function looseJsonParse(obj) {
    let nahradCarku = obj.replaceAll(",", ".")
    return eval?.(`"use strict";(${nahradCarku})`);
}

// Zabranuje použití všech kláves krom čísel a +,-,*,...
textPole.addEventListener('keydown', function (event) {
    // Regulární výraz pro povolené znaky (čísla 0-9, +, -, *, /, %)
    if (!/[0-9\+\-\*\,\/%]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
        event.preventDefault();
    }

    if (event.key === "Enter") {
        event.preventDefault();
        vypocitej()
    }

    if (/[\+\-\*\/%]/.test(event.key) && textPole.value !== /[\+\-\*\/%]/.test(event.key)) {
        if (textPole.value.match(/[\+\-\*\/%]/)) {
            return
        } else {
            event.preventDefault()
            pridejOperator(event.key)
        }

    }

});

function pridejCislo(cislo) {
    textPole.value += cislo
}

// Pokud input.value není prázdný, přidá se aktuální číslo + operátor
// Pokud je momentalniHodnota = "", tak se přidá 0 + operátor
function pridejOperator(operator) {
    if (textPole.value !== "") {
            momentalniHodnota += textPole.value + operator
            // vypisuje do labelu aktuální hodnotu
            hodnota.textContent = momentalniHodnota
            textPole.value = ""
    } else if (momentalniHodnota === "") {
        momentalniHodnota += 0 + operator
        hodnota.textContent = momentalniHodnota
        textPole.value = ""
    }
}

// Vytvoření funkce na tlačítko, která funguje jako backspace
function backspaceBtn() {
    textPole.value = textPole.value.substring(0, textPole.value.length - 1);
}

// Převede číslo na negativní a obráceně
function prevedCislo() {
    textPole.value = textPole.value - (textPole.value * 2)
}

function reset() {
    momentalniHodnota = ""
    hodnota.textContent = ""
    textPole.value = ""
}

function vypocitej() {
    if (textPole.value !== "") {
            momentalniHodnota += textPole.value
            hodnota.textContent = momentalniHodnota
    
            let result = looseJsonParse(momentalniHodnota)
            textPole.value = result
            momentalniHodnota = ""

    } else {
        console.log("Textové pole je prázdné! Napiš něco..");
    }
}

// function vypocitej() {
//     if (textPole.value === "") {
//         console.log("Textové pole je prázdné! Napiš něco..");
//         return;
//     }

//     let vstup = textPole.value.replace(",", "."); // Nahradí čárku tečkou pro správný formát čísla
//     if (vstup.match(/[\+\-\*\/]/)) { // Zjednodušený regex pro vyhledávání operátorů
//         console.log("ted"); // Tato zpráva může být pro odstraňování, pokud již není potřeba
//     }

//     let result = looseJsonParse(vstup); // Vypočítá výraz
//     hodnota.innerHTML = result; // Zobrazí výsledek přímo, místo použití meziproměnné
//     textPole.value = result; // Nastaví výsledek zpět do textového pole
// }



// Reviewing your JavaScript code reveals several areas for improvement, including best practices, security considerations, and functionality bugs. Here's a detailed breakdown:

// Security Concerns
// Usage of eval in looseJsonParse Function: Utilizing eval poses significant security risks, especially when parsing user input, as it can execute arbitrary code. Consider using a safer alternative for evaluating mathematical expressions, such as the Function constructor or a dedicated math expression parser library.
// Best Practices
// Code Organization: Group related functions and event listeners together for better readability and maintainability.
// Use of innerHTML vs. textContent: For updating text that doesn't contain HTML, use textContent instead of innerHTML to prevent potential Cross-Site Scripting (XSS) attacks.
// Regular Expression Improvements:
// In your vypocitej function, the regular expression check textPole.value.match(/\+\-\*\//) might not work as expected because it looks for any of the characters +, -, *, or / individually rather than as a group. If you're trying to match an expression containing these operators, you'll need a different approach.
// The check textPole.value !== /[\+\-\*\/%]/.test(event.key) is incorrect. It seems you want to compare textPole.value against a boolean, which doesn't make sense. You likely intended to prevent operator spamming, but this condition needs to be corrected.
// Functional Bugs
// Operator Spamming Prevention: Your current implementation to prevent operator spamming doesn't function as intended. The logic to check if the last character is an operator before allowing another operator should be revised.
// Evaluation of Mathematical Expressions: Your vypocitej function attempts to evaluate the expression in textPole.value but the regular expression used doesn't properly validate or parse the expression before evaluation. Additionally, relying on eval or similar for evaluation can be unsafe.
// Code Improvements
// Here's a revised version of your code with some of these improvements:



// let textPole = document.getElementById("pole");
// let hodnota = document.getElementById("momentalniHodnota");

// let momentalniHodnota = "";

// // Improved alternative to eval for parsing mathematical expressions
// function safeEval(expr) {
//     // Implementation for a safe evaluation (placeholder)
//     // Consider using a math parsing library or a safer evaluation strategy
// }

// // Updated event listener for keydown
// textPole.addEventListener('keydown', function (event) {
//     // Allowed characters
//     if (!/[0-9+\-*/,/%]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
//         event.preventDefault();
//     }

//     // Enter key submits the expression for calculation
//     if (event.key === "Enter") {
//         event.preventDefault();
//         vypocitej();
//     }

//     // Prevent operator spamming
//     if (/[\+\-*/%]/.test(event.key)) {
//         const lastChar = textPole.value.slice(-1);
//         if (/[\+\-*/%]/.test(lastChar)) {
//             event.preventDefault(); // Prevents adding another operator
//         } else {
//             pridejOperator(event.key);
//         }
//     }
// });

// function pridejOperator(operator) {
//     if (textPole.value !== "") {
//         momentalniHodnota += textPole.value + operator;
//         hodnota.textContent = momentalniHodnota; // Use textContent for safer updates
//         textPole.value = "";
//     }
// }

// function reset() {
//     momentalniHodnota = "";
//     hodnota.textContent = ""; // Use textContent for safer updates
//     textPole.value = "";
// }

// function vypocitej() {
//     if (textPole.value !== "") {
//         momentalniHodnota += textPole.value;
//         hodnota.textContent = momentalniHodnota; // Use textContent for safer updates
//         let result = safeEval(momentalniHodnota); // Use the safe evaluation function
//         textPole.value = result;
//         momentalniHodnota = "";
//     } else {
//         console.log("Textové pole je prázdné! Napiš něco..");
//     }
// }



// Notes:
// safeEval Placeholder: Replace this with a secure implementation or library for evaluating mathematical expressions.
// Improving Regular Expressions: Ensure your regular expressions accurately match your intended patterns and use cases.
// Safer DOM Updates: Switching to textContent prevents potential security issues.
// This revised code aims to address the key issues identified while maintaining the original functionality. Consider testing thoroughly to ensure it meets all your requirements.