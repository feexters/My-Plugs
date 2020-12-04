/* ARROW TO TOP */
let $scroll = document.querySelector('.scroll_to_top')
window.addEventListener("scroll", event => {
    if (window.pageYOffset > 200) {
        $scroll.dataset.show = true
        
    } else {
        $scroll.dataset.show = false
    }
})

$scroll.addEventListener("click", () => {
    requestAnimationFrame(scrollPage)
})

function scrollPage() {
    let step = 35

    if (window.pageYOffset < step) {
        window.scrollTo(0, 0)
        return
    } else {
        window.scrollTo(0, window.pageYOffset - step)
    }

    requestAnimationFrame(scrollPage)
}