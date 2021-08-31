
import recipeView from './views/recipeView.js';
import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; 


// https://forkify-api.herokuapp.com/v2

// 1a95e858-c21c-4674-9549-a53349dd0a4b
/////////////////////////////////////


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
   recipeView.render(model.state.recipe)

  }catch(err) {
    console.log(err);
  }
};

function init() {
  recipeView.addHandlerRender(controlRecipe)
}
init()

