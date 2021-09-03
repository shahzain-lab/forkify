import previewView from "./previewView";
import View from "./view";

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _message = '';
    _messageError = 'No bookmark yet.find a nice recipe and bookmark it :)'

    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
       return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }

}

export default new BookmarksView();