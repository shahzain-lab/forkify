import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            
            const data = res.data.recipe;
            this.title = data.title;
            this.author = data.publisher;
            this.img = data.image_url;
            this.url = data.source_url;
            this.ingredients = data.ingredients

        }catch(error) {
            alert(`error ${error} `);
        }
    }

    calcTime() {
        //assuming that we have 15 min for each ingredients
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period * 15;
    }

    calcServing() {
        this.serving = 4;
    }

    parseIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']

        const newIngredients = this.ingredients.map(ele => {
            // uniform unit
            let ingredient = ele.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            }) 

            //remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            return ingredient;

        })
            this.ingredients = newIngredients;
    }

}