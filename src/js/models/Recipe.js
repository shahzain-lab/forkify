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

}