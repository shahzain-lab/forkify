import { getJson } from "./helper.js";
import { API_URL, RES_PER_PAGE } from './config.js'

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resPerPage: RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
}

export async function loadRecipe(id) {
    try{

        // 1. load the recipe
        const data = await getJson(`${API_URL}${id}`);
        
        let { recipe } = data.data;
        
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
       if(state.bookmarks.some(b => b.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    }catch(err) {
        throw err;
    }
}

export async function loadSearchResults(query) {
    try{
        state.search.query = query;
        const data = await getJson(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map(rec => {
            return{
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
        state.search.page = 1;
    }catch(err){
        console.error(err);
    }
}


export function loadSearchResultPage(page = state.search.page) {
    state.search.page = page
    const start = (page - 1) * state.search.resPerPage;
    const end = page * state.search.resPerPage;

   return state.search.results.slice(start, end);
}

export function updateServing(newServing) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity =  (ing.quantity * newServing) / state.recipe.servings ;  
    });

    state.recipe.servings = newServing;
}

export function addBookmark(recipe) {
    // add recipe to bookmark []
    state.bookmarks.push(recipe);

    // check bookmarked recipe
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
}


export function removeBookmark(id) {
    // remove recipe from bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1)

    // check bookmarked recipe
    if(id === state.recipe.id) state.recipe.bookmarked = false;
;}