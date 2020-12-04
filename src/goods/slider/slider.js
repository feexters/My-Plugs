import './style/_slider.scss'
import {template, addArrows, createSlides} from './functions'

export class Slider { 
    constructor(options) {
        this.ANIMATION_SPEED = 500
        this.options = options
        this.step = 0  
    }

    /* Create slider */
    create() {
        /* Input slider to DOM */
        this.$slider = document.querySelector(this.options.selector)
        this.$slider.insertAdjacentHTML('beforeend', template(this.options))

        this.slides = createSlides(this.options.img, this.$slider)

        /* Create arrows */
        if (this.options.arrows) {
            addArrows.bind(this)(this.$slider)
        }

        /* Draw the first slide */
        this.slides[this.step]._draw()
    }

    /* Create new slide and delete old slide */
    _moving() {
        this.slides[this.step]._draw()
        setTimeout(() => this.slides[this.step]._delete(), this.ANIMATION_SPEED)
    }

    /* Delete the slider from DOM */
    destroy() {
        this.$slider.remove()
    }
}