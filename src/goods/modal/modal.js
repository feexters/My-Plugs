import './style/_modal.scss'
import {_createModal, _createFooter} from './create.js'

export class Modal {
    constructor(options) {
        this.ANIMATION_SPEED = 300
        this.$modal = _createModal(options)

        this.$modal.addEventListener("click", event => {
            if (event.target.dataset.close) {
                this.close()
            }
        })
    }

    /* Open window */
    open(){
        this.$modal.classList.add('open')
    }

    /* Close window */
    close(){
        this.$modal.classList.add('hide')
        this.$modal.classList.remove('open')
        setTimeout(() => {
            this.$modal.classList.remove('hide')
        }, this.ANIMATION_SPEED)
    }

    /* Change content */
    setContent(html) {
        this.$modal.querySelector('[data-content]').innerHTML = html
    }

    /*  Delete modal-window */
    destroy(){
        this.$modal.remove()
    } 
}