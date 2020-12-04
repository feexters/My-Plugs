/* Create buttons in modal-footer */
export function _createFooter(buttons = {}) {

    if (!buttons.length) {
        return ''
    }

    /* Create modal-footer */
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')
    
    /* Add class for buttons */
    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('modal-button')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || (() => {})

        wrap.append($btn)
    })

    return wrap
}

/* Create modal-window in DOM */
export function _createModal(options = {}) {
    const DEFAULT_WIDTH = "400px"

    const modal = document.createElement('div')
    modal.classList.add('modal')

    /* Template for modal */
    modal.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="max-width: ${options.width || DEFAULT_WIDTH};">
            <div class="modal-header">
                <span class="modal-title">${options.title || ''}</span>
                ${options.close ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>${options.content || ''}</div>
            </div>
        </div>
    `)

    const footer = _createFooter(options.buttons)
    modal.querySelector('[data-content]').after(footer)

    document.body.append(modal)

    return modal
}