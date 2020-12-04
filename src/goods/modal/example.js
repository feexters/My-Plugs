import {Modal} from './modal.js'

/* Example options */
let options = {
    title: "Title",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    close: true,
    width: "400px",
    buttons: [
        {text: 'Open again', type: 'open', handler(){
            modal.close()
            setTimeout(() => modal.open(), 500)
        }},
        {text: 'Destroy', type: 'destroy', handler(){
            modal.destroy()
        }}
    ]
}

/* Create modal */
let modal = null
const $openModal = document.querySelector('.open-modal')
$openModal.addEventListener('click', event => {
    if (modal) {
        modal.destroy()
    }
    modal = new Modal(options)
    setTimeout(() => modal.open(), 0)
})