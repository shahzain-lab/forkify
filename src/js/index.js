import Search from './models/Search';

//Global state of the app
const state = {};


const searchCTRL =async () => {
    //get query value
    const query = 'pizza';
    
    if(query) {
        // 1> new search obj and to the state
        state.search = new Search(query);
        
        // 2> prepare the UI for result


        // 3> get the result
        await state.search.getRecipes();

        // 4> render the result to UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault();
    searchCTRL();
})