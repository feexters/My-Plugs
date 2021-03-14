import {getImages} from './image'
import './_style.scss'

let count = 0 
let width 
const $slider = document.querySelector('.slider')
const $sliderLine = document.querySelector('.slider-line')

/* Get URL imgages from server and put them in DOM */
function createSlides() {
    getImages().then(img => {
        img.forEach(url => {
            $sliderLine.insertAdjacentHTML('afterbegin', `
                <img src="${url}" alt="" class="slider__image">
            `)
        })
        createSlider()
    })
}

function createSlider() {
    const images = $slider.querySelectorAll('.slider__image')

    /* Next slide */
    document.querySelector('.slider__arrow-next').addEventListener('click', () => {
        count++

        if (count == images.length) {
            count = 0
        }

        width = $sliderLine.offsetWidth
        rollSlider()
    })

    /* Previous slide */
    document.querySelector('.slider__arrow-prev').addEventListener('click', () => {
        count--

        if (count < 0) {
            count = images.length - 1
        }

        width = $sliderLine.offsetWidth
        rollSlider()
    })
}

/* Get a current width of slider */
window.addEventListener('resize', () => {
    width = $sliderLine.offsetWidth
    rollSlider()
})

/* Scrolling slide */
function rollSlider() {
    console.log(count)
    $sliderLine.style.transform = 'translate(-' + count * width + 'px)'
}

createSlides()
