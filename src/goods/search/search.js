import './style/_search.scss'

const getTemplate = (options) => {

    const outputElems = (selector) => {
        const elems = document.querySelectorAll(selector)
        const outputElems = []

        let rows = 0
        /* Create elements */
        for (let elem of elems) {
            /* Create open items */
            if (rows < options.maxRows) {
                outputElems.push(`<li class="search__elem" data-hide="false">${elem.innerText}</li>`)
                rows++
            } else {
                /* Create hidden elements */
                outputElems.push(`<li class="search__elem" data-hide="true">${elem.innerText}</li>`)
            }
            
        }

        return outputElems.join('\n')
    }

    return `
        <div class="search">
            <input type="text" class="search-input" placeholder="${options.plHolder ? options.plHolder : 'Search...'}">
            <div class="search-output" data-hide="true">
                ${outputElems(options.elemSelector)}
            </div>
        </div>
    `

}

export class Search {
    constructor(options) {
        this.options = options
        this.$search = document.querySelector(this.options.selector)

        this._render()
        this._setup()
    }

    _render() {
        /* Create the search block */
        this.$search.insertAdjacentHTML('beforeend', getTemplate(this.options))
    }

    _setup() {
        /* Setup the max of rows */
        if (!this.options.maxRows) {
            this.options.maxRows = 5
        }

        /* Add events */
        this.$inputPlace = this.$search.querySelector('.search-input')
        
        /* Search script */
        this.inputHandler = this.inputHandler.bind(this)
        this.$inputPlace.addEventListener('input', this.inputHandler)
        
        /* Open window */
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)

        this.$inputPlace.addEventListener('focus', this.show)
        this.$inputPlace.addEventListener('blur', this.hide)

    }

    show() {
        this.$search.querySelector('.search-output').dataset.hide = 'false'
    }

    hide() {
        this.$search.querySelector('.search-output').dataset.hide = 'true'
    }

    /* Event for search */
    inputHandler() {
        const value = this.$inputPlace.value.trim()
        const items = this.$search.querySelectorAll('.search__elem')

        /* Counter of output elements */
        let counter = 0

        /* Search elements */
        items.forEach(elem => {
            const pos = elem.innerText.toLowerCase().indexOf(value.toLowerCase())
    
            if (pos  == -1) {
                /* Hide element */
                elem.dataset.hide = "true"
            } else {
                /* Show elem */
                if (++counter > this.options.maxRows) {
                    elem.dataset.hide = "true"
                } else {
                    elem.dataset.hide = "false"
                    elem.innerHTML = this.setMark(elem.innerText, pos, value.length)
                }
            }

        })

        if (!counter) {
            this.$search.querySelector('.search-output').insertAdjacentHTML('beforeend', `<li class="search__elem _nothing" data-hide="false">Nothing found</li>`)
        }
    }

    /* Set a mark in the text */
    setMark(str, pos, size) {
        return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + size) + '</mark>' + str.slice(pos + size)
    }

    destroy() {
        this.$inputPlace.removeEventListener('input', this.inputHandler)
        this.$search.querySelector('.search').remove()
    }

}