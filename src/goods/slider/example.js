import {Slider} from './slider.js'


const options = {
    width: '200px',
    height: '100px',
    img: ['blue', 'green', 'red'],  // img url or color
    selector: '.slider-example',    // name of selector
    arrows: true,                   // true or false
    points: true
}

const slider = new Slider(options)
slider.create()