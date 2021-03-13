import './style/_style.scss'

export function upload(selector, options) {
    const $input = document.querySelector(selector)
    $input.style.display = 'none'

    let files = []
    let images = []

    const onUpload =  options.onUpload ? options.onUpload : noop

    /* Activate options */
    if (options.multiple) {
        $input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        $input.setAttribute('accept', options.accept.join(', '))
    }

    /* Create a block of preview */
    const $preview = element('div', ['preview'])
    $input.insertAdjacentElement('afterend', $preview)

    /* Create an upload button */
    const $upload = element('button', ['btn', 'primary'], 'Загрузить')
    $input.insertAdjacentElement('afterend', $upload)
    $upload.style.display = 'none'

    /* Create custom button for opening files */
    const $open = element('button', ['btn'], 'Открыть')
    $input.insertAdjacentElement('afterend', $open)


    const trigerInput = () => $input.click()

    /* Openning a file */
    const changeHandler = event => {
        if (!event.target.files.length) {
            return
        }

        files = Array.from(event.target.files)
        $upload.style.display = 'inline'

        /* Set the files in the block with previews */
        $preview.innerHTML = ''

        /* Clear a list of images */
        images = []

        /* Upload a previews of files */
        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }

            const reader = new FileReader()

            /* Create a template for each of previews */
            reader.onload = event => {
                const src = event.target.result
                $preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image">
                        <div class="preview__remove" data-name="${file.name}">&times</div>
                        <img src="${src}" alt="${file.name}"/>
                        <div class="preview-info">
                            <span class="preview-info__name">${shortenName(file.name)}</span>
                            <span class="preview-info__size">${bytesToSize(file.size)}</span>
                        </div>
                    </div>
                `)

                images.push({
                    file: file,
                    $prev: document.querySelector('.preview-image')
                })
            }

            reader.readAsDataURL(file)
        })
    }

    function removePreview(event) {
        if (!event.target.dataset.name) {
            return 
        }

        const {name} = event.target.dataset
        /* Delete the file from list */
        images = images.filter(image => image.file.name !== name)
        
        if (!images.length) {
            $upload.style.display = 'none'
        }

        /* Delete the file from DOM*/
        const block = $preview
            .querySelector(`[data-name="${name}"]`)
            .closest('.preview-image')
        
        block.classList.add('removing')
        setTimeout(() => block.remove(), 300)
    }

    const clearPreview = el => {
        el.style.bottom = '0'
        el.innerHTML = '<div class="preview-info__progress"></div>'
    }

    const uploadHandler = () => {
        $preview.querySelectorAll('.preview__remove').forEach(el => el.remove())
        const previewInfo = $preview.querySelectorAll('.preview-info') 
        previewInfo.forEach(clearPreview)
        onUpload(images,  previewInfo)
    }
    

    $open.addEventListener('click', trigerInput)
    $input.addEventListener('change', changeHandler)
    $preview.addEventListener('click', removePreview)
    $upload.addEventListener('click', uploadHandler)
}

////////////////////////////////

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (!bytes) {
        return '0 Byte'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }

 /* Create a short name */
 function shortenName(name) {
    const extension = name.slice(name.lastIndexOf('.'))
    return name.slice(0, 6) + '...' + extension
}

/* Creating DOM elements */
const element = (tag = 'div', classes = [], content) => {
    const node = document.createElement(tag)

    if (classes.length) {
        node.classList.add(...classes)
    }

    if (content) {
        node.textContent = content
    }

    return node
}

function noop () {}