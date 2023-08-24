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

function main() {
    animateButton();
}

main ();