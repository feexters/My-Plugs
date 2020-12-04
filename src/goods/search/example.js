import {Search} from './search'

const options = {
    selector: '.search-example',
    elemSelector: '.goods__name',
    plHolder: 'Search something...',
    maxRows: 2
}

window.search = new Search(options)