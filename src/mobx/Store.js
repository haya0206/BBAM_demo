import { observable, action } from "mobx";

class ObservableStore {
  @observable
  blocks = null;

  @action
  changeText(item) {
    this.text = item;
  }
}

export default ObservableStore;
