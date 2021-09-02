import View from "./view";
import previewView from "./previewView";

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _message = '';
    _messageError = 'no recipe found for your query.try again :)'

    _generateMarkup() {
      return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
   }
}

export default new ResultsView();