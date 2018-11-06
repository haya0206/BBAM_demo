import io from "socket.io-client";
class Socket {
  constructor({ store }) {
    this.io = null;
    this.userData = null;
    this.state = store;
  }
  login = ({ id, name, rating, rank }) => {
    return new Promise((resolve, reject) => {
      if (this.io === null) {
        this.io = io("https://bbam.study", {
          query: { id, name, rating, rank }
        });
        this.io.once("logined", userData => {
          this.userData = userData;
        });
      }
      this.io.on("invite", user => {
        this.state.handleInvite(user);
        this.io.on("roomId", (id, problemNum) => {
          this.state.roomIdSet(id);
          resolve(problemNum);
        });
      });
    });
  };
  getUserList = () => {
    return new Promise((resolve, reject) => {
      this.io.emit("reqList");
      this.io.on("list", users => {
        delete users[this.userData.socketId];
        console.log(users);
        this.state.setUsers(users);
        this.io.on("addList", info => {
          this.state.addUser(info);
        });
        this.io.on("delList", socketId => {
          this.state.deleteUser(socketId);
        });
      });
    });
  };
  toBattle = AnotherUser => {
    return new Promise((resolve, reject) => {
      this.io.emit("invite", AnotherUser, this.userData);
      this.io.on("inviteAllow", (bool, id, problemNum) => {
        this.io.emit("join");
        this.state.roomIdSet(id);
        console.log(id);
        resolve({ bool, problemNum });
      });
    });
  };
  toInvite = (user, bool) => {
    return new Promise((resolve, reject) => {
      this.state.invite();
      this.io.emit("inviteAllow", user, bool);
      resolve();
    });
  };
  startBattle = () => {
    return new Promise((resolve, reject) => {
      this.io.on("end", () => {
        resolve();
      });
    });
  };
  success = id => {
    return new Promise((resolve, reject) => {
      this.io.emit("success", id);
      resolve();
    });
  };
}

export default Socket;
