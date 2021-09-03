
import recipeView from './views/recipeView.js';
import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; 
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

async function controlRecipe() {
  try{
    
   // 1 get recipe ID
   const id = window.location.hash.slice(1);
   if(!id) return;

   // 2 render loading Spinner
   recipeView.renderSpinner();
   
   // 3 loading data
   await model.loadRecipe(id);

   // update search for active class
   resultsView.update(model.loadSearchResultPage());
   
   // 4 Update bookmarks list
   bookmarkView.update(model.state.bookmarks);

   // 5 render data
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

function controlUpdateServing(newServing) {
    model.updateServing(newServing);
    
    //  render UPDATE data
    recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  // add/remove bookmarks
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  
  // render bookmark
  recipeView.update(model.state.recipe);

  // render bookmark list
  bookmarkView.render(model.state.bookmarks);
}

function controlBookmarks() {
  // render bookmark list
  bookmarkView.render(model.state.bookmarks);
}

function init() {
  bookmarkView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlUpdateServing);
  recipeView.addHandlerBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init()

 