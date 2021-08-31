
import recipeView from './views/recipeView.js';
import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; 
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if(module.hot){
  module.hot.accept()
}

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

    // 2 load search result
    await model.loadSearchResults(query);

    // 3 render search result
    resultsView.render(model.state.search.results)
  }catch(err) {
    console.error(err);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults)
}
init()

 