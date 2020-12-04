/* Template for sliders */
export function template(options) {
    /* Create arrows template */
    const arrows = () => `
        <div class="slider-arrow arrow__left"></div>
        <div class="slider-arrow arrow__right"></div>
    `

    return `
        <div class="slider">
            <div class="slider-wrap" style="
            width: ${options.width ? options.width : '300px'}; 
            height: ${options.height ? options.height : '150px'}
            ">
                ${options.arrows ? arrows() : ''}
            </div>
        </div>
    `
}


/* Create events to arrows */
export function addArrows($slider) {
    const $toLeft = $slider.querySelector('.arrow__left')
    const $toRight = $slider.querySelector('.arrow__right')

    /* Add events to arrows */
    $toLeft.addEventListener('click', event => {
        if (this.step) {
            --this.step
        } else { 
            this.step = this.slides.length - 1
        }

        this._moving()
        
        /* Add animations for new and old slides */
        const slides = $slider.querySelectorAll('.slider-image')
        slides[slides.length - 1].classList.add('_from-right')
        slides[slides.length - 2].classList.add('_to-left')
    })

    $toRight.addEventListener('click', event => {
        if (this.step < this.slides.length - 1) {
            ++this.step
        } else { 
            this.step = 0
        }

        this._moving()

        /* Add animations for new and old slides */
        const slides = $slider.querySelectorAll('.slider-image')
        slides[slides.length - 1].classList.add('_from-left')
        slides[slides.length - 2].classList.add('_to-right')
    })
}

/* Transform images to DOM elements*/
export function createSlides(img, $slider) {
    const slides = []

    for (let i in img) {
        slides[i] = {
            slide: `<div class="slider-image" style="background: ${img[i]}"></div>`,
            /* Input slider in DOM */
            _draw() {
                $slider.querySelector(".slider-wrap").insertAdjacentHTML('beforeend', this.slide)
            },
            /* Delete the elder slide */
            _delete() {
                $slider.querySelector(".slider-image").remove()
            }
        }
    }

    return slides
}