class SearchView{
    #parentEl = document.querySelector('.search');

    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInp();
        return query;
    }

    #clearInp() {
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', e => {
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();