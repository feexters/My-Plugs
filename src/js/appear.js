/* APPEARANCE ELEMENTS */
const $appearElems = document.querySelectorAll('._appear')

function appearElements($elements) {

    let windowHeight = document.documentElement.clientHeight

    for(let elem of $elements) {

        let shownPart = windowHeight - elem.getBoundingClientRect().top
        let minPart = elem.getBoundingClientRect().height / 3
        let maxPart = windowHeight + elem.getBoundingClientRect().height/2

        if (shownPart > minPart &&
            shownPart < maxPart) {
            elem.dataset.appear = "true"
        } else {
            elem.dataset.appear = "false"
        }
    }

}

setTimeout(() => {
    appearElements($appearElems)
    window.addEventListener("scroll", event => appearElements($appearElems))
}, 200)