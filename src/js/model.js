export const state = {
    recipe: {}
}

export async function loadRecipe(id) {
    try{

        // 1. load the recipe
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
        if(!res.ok) throw new Error(`${res.status}, ${data.message}`);
        
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
        alert(err)
    }
}
