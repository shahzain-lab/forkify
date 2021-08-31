import { getJson } from "./helper.js";
import { API_URL } from './config.js'

export const state = {
    recipe: {}
}

export async function loadRecipe(id) {
    try{

        // 1. load the recipe
        const data = await getJson(`${API_URL}/${id}`);
        
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
        console.error(`${err} $$`);
    }
}
