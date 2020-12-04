/* SLIDE ARTICLES */
let $slideArticle = document.querySelectorAll('.article-next')
let $articles = document.querySelectorAll('.article')
let $footer = document.querySelector('footer')

/* Add event to arrows */
$slideArticle.forEach((elem, index) => {
    elem.addEventListener('click', event => {
        let nextArticle = $articles[index + 1 ].getBoundingClientRect().top
        if ($articles[index + 1 ].dataset.appear == "false") nextArticle -= 50
        slideArticle(nextArticle, 20)
    })
});

/* Scrolling animation */
function slideArticle(position, step) {
    function slideAnimation() {
        /* In the bottom of page */
        if ($footer.getBoundingClientRect().bottom == document.body.offsetHeight) {
            position = 0
        }

        /* Last step */
        if (position < step) {
            window.scrollTo(0, window.pageYOffset + position)
            return
        } else {
            window.scrollTo(0, window.pageYOffset + step)
            position -= step 
        }


        requestAnimationFrame(slideAnimation)
    }

    return  requestAnimationFrame(slideAnimation)
}
