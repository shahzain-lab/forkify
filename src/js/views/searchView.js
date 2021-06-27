import { elements } from "./base"

export const getInputVal = () => elements.searchInput.value;

export const clearFeild = () => {
  elements.searchInput.value = "";
}

export const clearResults = () => {
  elements.racipeResList.innerHTML = '';
  elements.pagination.innerHTML = '';
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

const createButtons = (page, type) => `
          <button class="btn--inline pagination__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
             <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
              <svg class="search__icon">
                  <use href="img/icons.svg#icon-arrow-${type === 'prev' ? 'left' : 'right'}"></use>
              </svg>
          </button>
`

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if(page === 1 && pages > 1) {
    //only render 'next' btn
    button = createButtons(page, 'next')  
  
  }else if(page < pages){
    //Both btns
    button =` 
         ${createButtons(page, 'prev')}
         ${createButtons(page, 'next')}
         `
  
  }else if(page === pages && pages > 1){
     //only render 'prev' btn
     button = createButtons(page, 'prev')
  }

  elements.pagination.insertAdjacentHTML('afterbegin', button)
}

export const renderResults = (racipes, page = 1, resPerPage = 10) => {

  // render page racipes
  const end = page * resPerPage; 
  const start = (page - 1) * resPerPage;
  racipes.slice(start, end).forEach(renderRacipe);

  //render pagination buttons
  renderButtons(page, racipes.length, resPerPage)
}