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
  if(title.length > limit){
    title.split(" ").reduce((acc ,cur) => {
      if(acc + cur.length <= limit){
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

export const renderResults = racipes => {
    racipes.forEach(renderRacipe)
}