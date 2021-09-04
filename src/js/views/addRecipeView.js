import View from './view';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.add-recipe-window');
    _closeBtn = document.querySelector('.btn--close-modal');
    _openBtn = document.querySelector('.nav__btn--add-recipe')

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
    }

    _toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._openBtn.addEventListener('click', this._toggleWindow.bind(this));
    }

    _addHandlerCloseWindow() {
        this._closeBtn.addEventListener('click', this._toggleWindow.bind(this));
        this._overlay.addEventListener('click', this._toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data)
        })
    }

    _generateMarkup() {

    }
}

export default new addRecipeView();