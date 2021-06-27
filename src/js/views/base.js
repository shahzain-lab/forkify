export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchRes: document.querySelector('.search-results'),
    racipeResList: document.querySelector('.results'),
    pagination: document.querySelector('.pagination')
}

const elementsStr = {
    spinner: 'spinner'
}

export const renderSpinner = parent => {
    const spinner = `
    <div class="${elementsStr.spinner}">
    <svg>
      <use href="img/icons.svg#icon-loader"></use>
    </svg>
  </div>
    `
    parent.insertAdjacentHTML('afterbegin', spinner)
}

export const clearSpinner = () => {
    const spinner = document.querySelector(`.${elementsStr.spinner}`);
    if(spinner) spinner.parentElement.removeChild(spinner);
}