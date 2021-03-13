import '@goods/burger/burger.js'
import '@goods/modal/example.js'
import '@goods/slider/example.js'
import '@goods/search/example.js'
import '@goods/image-loader/app.js'

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

////// SORT ///////

const sortedNodes = sortByName(goodsNames)

const $sort = document.querySelector('.catalog-sort')
const arrowSymbol = $sort.textContent[7]
let direction = false

$sort.addEventListener('click', () => {
    if (direction) {
        sortedNodes.forEach((elem, i) => elem.parentNode.style.order = i)
        $sort.textContent = `Sort A ${arrowSymbol} Z`
    } else {
        sortedNodes.forEach((elem, i) => elem.parentNode.style.order = sortedNodes.length - 1 - i)
        $sort.textContent = `Sort Z ${arrowSymbol} A`
    }

    direction = !direction
})

function sortByName(array) {

    if (array.length < 2) {
        return array
    }

    let less = []
    let more = []
    let main = array[0]

    for (let i = 1; i < array.length; i++) {
        
        if (array[i].textContent <= main.textContent) {
            less.push(array[i])
        } else {
            more.push(array[i])
        }
    }   

    return sortByName(less).concat(main, sortByName(more))
}