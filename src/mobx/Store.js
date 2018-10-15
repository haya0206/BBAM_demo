import { observable, action, computed } from "mobx";
class ObservableStore {
  @observable
  workspace = null;
  @observable
  isChange = true;
  @observable
  userList = {};
  @observable
  isInviting = false;
  @observable
  inviteUser = null;
  @observable
  roomId = "";
  @observable
  stop = 0;
  @observable
  much = 0;
  @observable
  muchModalOpen = false;
  @action
  deleteUser = id => {
    delete this.userList[id];
  };
  @action
  addUser = info => {
    this.userList[info.socketId] = { name: info.name, id: info.id };
  };
  @action
  setUsers = users => {
    this.userList = users;
  };
  @action
  handleInvite = user => {
    this.isInviting = true;
    this.inviteUser = user;
  };
  @action
  roomIdSet = id => {
    this.roomId = id;
  };
  @action
  invite = () => {
    this.isInviting = false;
  };
}

export default ObservableStore;
