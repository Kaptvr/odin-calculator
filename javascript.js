let equation = '';

function animateButton () {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('mousedown', e => {
            e.target.classList.add('pressed')
        })
    })
    
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
            if (e.target.classList[0] == 'operand' ||
                e.target.classList[0] == 'operator' ||
                e.target.classList[0] == 'comma') {
                equation += e.target.textContent;
                updateEquationField ();
            } else if (e.target.classList[0] == 'AC') {
                clearEquation();
            } else if (e.target.classList[0] == 'Delete') {
                deleteLastChar();
            } else if (e.target.classList[0] == 'equal') {
                evaluateEquasion();
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
    updateEquationField();
}

function deleteLastChar () {
    equation = equation.slice(0, equation.length - 1);
    updateEquationField();
}

function evaluateEquasion () {
    // console.log(equation);
    // console.log(typeof equation);

    // equationArray = Array.from(equation);

    // test = equation.split('+');

    // console.log(test);
    // console.log(typeof test);

}


function main() {
    registerButton();
    animateButton();
}

main ();