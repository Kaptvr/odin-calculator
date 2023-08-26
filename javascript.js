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
                evaluateEquation();
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

function evaluateEquation () {
    let copy = equation;
    copy = splitEquationString('+', copy);
    console.log(copy + ' ' + 'after +');
    copy = splitEquationArray('-', ...copy);
    console.log(copy + ' ' + 'after -');
    copy = splitEquationArray('*', ...copy);
    console.log(copy + ' ' + 'after *');
    copy = splitEquationArray('/', ...copy);
    console.log(copy + ' ' + 'after /');
    copy = splitEquationArray('^', ...copy);
    console.log(copy + ' ' + 'after ^');
    copy = splitEquationArray('!', ...copy);
    console.log(copy + ' ' + 'after !');

    copy = calculateResult(copy);

    equation = copy;
    updateEquationField();    
}

function splitEquationString (operator, copy) {
    copy = copy.split(operator);
    let temp = []
    for (let i = 0; i < copy.length - 1; i++) {
        temp.push(copy[i]);
        temp.push(operator);
    }
    temp.push(copy[copy.length - 1]);
    return temp;
}

function splitEquationArray (operator, ...copy) {
    let temp = [];
    copy.forEach(item => {
        item = item.split(operator);
        for (let i = 0; i < item.length - 1; i++) {
            temp.push(item[i]);
            temp.push(operator);
        }
        temp.push(item[item.length - 1]);
    });
    return temp; 
}

function calculateResult (copy) {
    copy = factorial(copy);
    copy = exponentiate(copy);
    copy = multiplicateDivide(copy);
    copy = addSubstract(copy);
    
    return copy;
}

function factorial (copy) {
    while (copy.indexOf('!') != -1) {
        let index = copy.indexOf('!');
        let limit = parseInt(copy[index - 1])
        let partResult = 1;
        for (let i = 0; i < limit; i++) {
            partResult *= i + 1;
        }
        copy.splice(index - 1, 3, partResult)
    }
    return copy;
}

function exponentiate (copy) {
    while (copy.indexOf('^') != -1) {
        let index = copy.indexOf('^');
        let partResult = parseFloat(copy[index - 1]) ** parseFloat(copy[index + 1])
        copy.splice(index - 1, 3, partResult);
    }
    return copy;
}

function multiplicateDivide (copy) {
    while (copy.indexOf('/') != -1 || copy.indexOf('*') != -1) {
        while (copy.indexOf('/') != -1 && copy.indexOf('*') != -1) {
            if (copy.indexOf('/') < copy.indexOf('*')) {
                let index = copy.indexOf('/');
                let partResult = parseFloat(copy[index - 1]) / parseFloat(copy[index + 1])
                copy.splice(index - 1, 3, partResult)
            } else {
                let index = copy.indexOf('*');
                let partResult = parseFloat(copy[index - 1]) * parseFloat(copy[index + 1])
                copy.splice(index - 1, 3, partResult)
            }
        }
        if (copy.indexOf('/') == -1) {
            let index = copy.indexOf('*');
            let partResult = parseFloat(copy[index - 1]) * parseFloat(copy[index + 1])
            copy.splice(index - 1, 3, partResult)
        } else if (copy.indexOf('*') == -1) {
            let index = copy.indexOf('/');
            let partResult = parseFloat(copy[index - 1]) / parseFloat(copy[index + 1])
            copy.splice(index - 1, 3, partResult)
        } 
    }
    return copy;
}

function addSubstract (copy) {
    while (copy.indexOf('-') != -1 || copy.indexOf('+') != -1) {
        while (copy.indexOf('-') != -1 && copy.indexOf('+') != -1) {
            if (copy.indexOf('-') < copy.indexOf('+')) {
                let index = copy.indexOf('-');
                let partResult = parseFloat(copy[index - 1]) - parseFloat(copy[index + 1])
                copy.splice(index - 1, 3, partResult)
            } else {
                let index = copy.indexOf('+')
                let partResult = parseFloat(copy[index - 1]) + parseFloat(copy[index + 1])
                copy.splice(index - 1, 3, partResult)
            }
        }
        if (copy.indexOf('-') == -1) {
            let index = copy.indexOf('+')
            let partResult = parseFloat(copy[index - 1]) + parseFloat(copy[index + 1])
            copy.splice(index - 1, 3, partResult)
        } else if (copy.indexOf('+') == -1) {
            let index = copy.indexOf('-');
            let partResult = parseFloat(copy[index - 1]) - parseFloat(copy[index + 1])
            copy.splice(index - 1, 3, partResult)
        } 
    }
    return copy;
}

function main() {
    registerButton();
    animateButton();
}

main ();