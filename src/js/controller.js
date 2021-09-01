
import recipeView from './views/recipeView.js';
import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; 
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

async function controlRecipe() {
  try{
    
   // 1 get recipe ID
   const id = window.location.hash.slice(1);
   if(!id) return;

   // 2 render loading Spinner
   recipeView.renderSpinner();
   
   // 3 loading data
   await model.loadRecipe(id);

   // 4 render data
   recipeView.render(model.state.recipe);

  }catch(err) {
    recipeView.renderErrorMsg()
  }
};

async function controlSearchResults() {
  try{
    resultsView.renderSpinner()
    // 1 get query
    const query = searchView.getQuery();
    if(!query) return; 

    // 2 load search results
    await model.loadSearchResults(query);

    // 3 render search results
    resultsView.render(model.loadSearchResultPage());

    // 4 render pagination
    paginationView.render(model.state.search);
  }catch(err) {
    console.error(err);
  }
}

function controlPagination(gotoPage) {
  // 1 render NEW results
  resultsView.render(model.loadSearchResultPage(gotoPage));
  // 2 render pagination
  paginationView.render(model.state.search);

}

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init()

 