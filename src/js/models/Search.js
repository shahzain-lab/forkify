import axios from 'axios';


export default class Search{
    constructor(query){
        this.query = query;
    }
    async getRecipes() {
        const _url = `https://forkify-api.herokuapp.com/api/search?q=${this.query}`;
        try{
            const res = await axios(_url);
            this.result = await res.data.recipes;
        }catch(error){
            console.log(`${error} error`);
        }
    }
}

