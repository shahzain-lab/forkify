import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const gotoPage = +btn.dataset.goto;
            handler(gotoPage)
        })
    }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resPerPage);

        //page# 01, and other pages
        if(curPage === 1 && numPages > 1){
           return this._generateMarkupBtns('next');
        }; 

        // other pages
        if(curPage < numPages) {
            return `
            ${this._generateMarkupBtns('prev')}
            ${this._generateMarkupBtns('next')}
            `;
        };

        //last page
        if(curPage === numPages && numPages > 1) {
            return this._generateMarkupBtns('prev')
        };
        return '';
    }

    _generateMarkupBtns(type) {
        const curPage = this._data.page;
        if(type === 'next'){
            return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--${type}">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
              `;
        }
        if(type === 'prev'){
            return `
            <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--${type}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
            `;
        }
    }
}

export default new PaginationView();