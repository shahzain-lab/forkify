import { getJson } from "./helper.js";
import { API_URL } from './config.js'

export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
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
    }catch(err){
        console.error(err);
    }
}
