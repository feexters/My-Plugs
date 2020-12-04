import './style/_module.scss'

const $burgers = document.querySelectorAll('.burger__icon')

/* OPEN */
$burgers.forEach($burger => {
    $burger.addEventListener('click', event => {
        $burger.classList.toggle('is-open')
    })
})
