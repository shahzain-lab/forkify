import { elements } from "./base"

export const getInputVal = () => elements.searchInput.value;

export const clearFeild = () => {
  elements.searchInput.value = "";
}

export const clearResults = () => {
  elements.racipeResList.innerHTML = '';
}

const limitRacipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0)
    return `${newTitle.join(' ')} ...`
  }
  return title;
}

const renderRacipe = racipe => {
  const markup = `
    <li class="preview">
    <a class="preview__link preview__link--active" href="#${racipe.recipe_id}">
      <figure class="preview__fig">
        <img src="${racipe.image_url}" alt="${racipe.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${limitRacipeTitle(racipe.title)}</h4>
        <p class="preview__publisher">${racipe.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="img/icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>
    `
  elements.racipeResList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => `
     <button class="btn--inline pagination__btn--${type}">
        <svg class="search__icon">
           <use href="img/icons.svg#icon-arrow-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>

    <!-- <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>Page 1</span>
    </button>
    <button class="btn--inline pagination__btn--next">
    <span>Page 3</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-arrow-right"></use>
    </svg>
    </button> -->
`

const renderButton = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  if (page === 1 && pages > 1) {
    //only show the next btn
  } else if (page < pages) {
    //both btns
  } else if (page === pages && pages > 1) {
    //only show the prev btn
  }
}

export const renderResults = (racipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  racipes.slice(start, end).forEach(renderRacipe);
}