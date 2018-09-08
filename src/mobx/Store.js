import { observable } from "mobx";
class ObservableStore {
  @observable
  workspace = null;
  @observable
  isChange = true;
}

export default ObservableStore;
