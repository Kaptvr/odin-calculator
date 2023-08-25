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
    let copy = equation;
    copy = splitEquationString('+', copy)
    copy = splitEquationArray('-', ...copy)
    copy = splitEquationArray('*', ...copy)
    copy = splitEquationArray('/', ...copy)

    copy = calculateResult(copy);

    console.log(copy);
    
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

function multiDiv (copy) {
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

function addSubs (copy) {
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

function calculateResult (copy) {
    copy = multiDiv(copy);
    copy = addSubs(copy);
    
    return copy;
}


function main() {
    registerButton();
    animateButton();
}

main ();