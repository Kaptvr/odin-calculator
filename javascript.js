let equation = '';

function animateButton () {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('mousedown', e => {
            e.target.classList.add('pressed')
        })
    })
//////////////////////// change button classes to 'operator' and 'operand'
    buttons.forEach(button => {
        button.addEventListener('mouseup', e => {
            e.target.classList.remove('pressed')
        })
    })

    buttons.forEach(button => {
        button.addEventListener('mouseout', e => {
            e.target.classList.remove('pressed')
        })
    })
}

function registerButton () {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseup', e => {
            if (e.target.textContent === 'AC') {
                clearEquation();
            } else {
                equation += e.target.textContent;
                updateEquationField ();
            }
        })
    })
}

function updateEquationField () {
    const equationField = document.querySelector('.equation');
    equationField.textContent = equation;
}

function clearEquation () {
    equation = ''
    console.log(equation)
    const equationField = document.querySelector('.equation');
    equationField.textContent = '';
}


function main() {
    registerButton();
    updateEquationField();
    animateButton();
}

main ();

// function animateButton () {
//     const buttons = document.querySelectorAll('button');

//     buttons.forEach(button => {
//         button.addEventListener('mousedown', e => {
//             e.target.classList.add('pressed')
//         })
//     })

//     buttons.forEach(button => {
//         button.addEventListener('mouseup', e => {
//             e.target.classList.remove('pressed')
//         })
//     })

//     buttons.forEach(button => {
//         button.addEventListener('mouseout', e => {
//             e.target.classList.remove('pressed')
//         })
//     })
// }

// function registerButton (equation) {
//     const buttons = document.querySelectorAll('button');
//     buttons.forEach(button => {
//         button.addEventListener('mouseup', e => {
//             console.log(e.target.textContent)
//             if (e.target.textContent === 'AC') {
//                 clearEquation(equation);
//             } else {
//                 equation += e.target.textContent;
//                 updateEquationField (equation);
//             }
//         })
//     })
// }

// function updateEquationField (equation) {
//     const equationField = document.querySelector('.equation');
//     equationField.textContent = equation;
// }

// function clearEquation (equation) {
//     equation = ''
//     console.log(equation)
//     const equationField = document.querySelector('.equation');
//     equationField.textContent = '';
// }


// function main() {
//     // let equation = '';

//     registerButton (equation);
//     updateEquationField (equation);
//     animateButton();

    

// }

// main ();