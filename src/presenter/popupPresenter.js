import { render } from "../render.js";
import PopupView from "../view/popupView";
import PopupFormView from "../view/popupFormView";

export default class PopupPresenter {
  popupForm = new PopupFormView();

  init = (documentBody, filmsModel) => {
    this.documentBody = documentBody;
    this.filmsModel = filmsModel;
    this.presentFilms = [...this.filmsModel.getFilms()];

    render(this.popupForm, this.documentBody);
    render(new PopupView(this.presentFilms[1]), this.popupForm.getElement());
  };
}
