import Search from './models/Search';
import * as searchView from './views/searchView';
import { clearSpinner, elements, renderSpinner } from './views/base';
import Recipe from './models/Recipe';

//Global state of the app
const state = {};

// Search Controller
const searchCTRL =async () => {
    //get query value
    const query = searchView.getInputVal();
    
    if(query) {
        // 1> new search obj and to the state
        state.search = new Search(query);
        
        // 2> prepare the UI for result
        searchView.clearFeild();
        searchView.clearResults();
        renderSpinner(elements.searchRes)

        try{
            // 3> get the result
            await state.search.getRecipes();
    
            // 4> clear spinner
            clearSpinner()
    
            // 5> render the result to UI
            searchView.renderResults(state.search.result);
        }catch(err) {
            alert('Somthing went wrong with search....');
            
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchCTRL();
})

elements.pagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn--inline');
    const goToPage = parseInt(btn.dataset.goto, 10);

    searchView.clearResults();
    // 5> render the result to UI
    searchView.renderResults(state.search.result, goToPage);

});


//recipe object

const recipeCTRL = () => {
    const id = window.location.hash;
    console.log(id);
};

window.addEventListener('hashchange', recipeCTRL)
