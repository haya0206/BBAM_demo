import { observable, action } from "mobx";
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
  @observable
  anotherUser = null;
  @action
  addAnotherUser = id =>{
    this.anotherUser = id;
  }
  @action
  deleteUser = id => {
    delete this.userList[id];
  };
  @action
  addUser = info => {
    this.userList[info.socketId] = {
      name: info.name,
      id: info.id,
      rank: info.rank,
      rating: info.rating
    };
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
