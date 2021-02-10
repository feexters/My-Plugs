import '@goods/burger/burger.js'
import '@goods/modal/example.js'
import '@goods/slider/example.js'
import '@goods/search/example.js'

const goods = document.body.querySelectorAll('.goods')
const goodsNames = document.body.querySelectorAll('.goods__name')
/* Filter controller */
const filter = document.body.querySelector('.catalog-filter')
createShowList()

/* Create the list of items */
function createShowList() {
    let items = ''
    goodsNames.forEach(elem => {
        items += `<li class="filter-show__item">${elem.innerText}</li>\n`
    })

    filter.querySelector('.filter-show').insertAdjacentHTML('beforeend', items)
}

/* Open filter settings */
filter.querySelector('.filter__icon').addEventListener('click', () => {
    if (filter.dataset.open == "true") {
        filter.dataset.open = "false"
    } else {
        filter.dataset.open = "true"
    }
})

const showItems = filter.querySelectorAll('.filter-show__item')
let showCount = 0

/* Add class for selected item */
showItems.forEach(elem => elem.addEventListener('click', () => {
        elem.classList.toggle('_active')
        activateFilters(elem.classList.contains('_active'))
    })
)

/* Show the selected item */
function activateFilters(active = true) {
    active ? showCount++ : showCount--

    /* Nothing selected */
    if (showCount == 0) {
        goods.forEach(elem => {
            elem.dataset.show = "true"
        })

    } else {
        goods.forEach((elem, index) => {
            elem.dataset.show = showItems[index].classList.contains('_active')
        })
    }
}

