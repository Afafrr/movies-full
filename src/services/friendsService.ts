import { db } from "./config/firebase";
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { UserService } from "./userService";

export enum reqStatus {
  accepted = "accepted",
  pending = "pending",
  rejected = "rejected",
  sent = "sent",
}
export enum friendManage {
  add = "add",
  remove = "remove",
}

export class FriendsService {
  friendName;
  friendEmail;
  currUserEmail;
  friendRef;
  userRef;
  constructor(currUserEmail: string, friendName: string, friendEmail: string) {
    this.currUserEmail = currUserEmail;
    this.friendEmail = friendEmail;
    this.friendName = friendName;
    this.friendRef = doc(db, "Users", this.friendEmail);
    this.userRef = doc(db, "Users", this.currUserEmail);
  }

  async changeFriendStatus(status: reqStatus) {
    //status sent is for sending a invitation
    const userService = new UserService();
    const userObj = await userService
      .getUserObject(this.currUserEmail)
      .then((username) => username);
    let friendsRequest: any;
    let userRequest: any;
    let userStatus = reqStatus.pending;
    let friendStatus = reqStatus.pending;
    //based on reqStatus different operations are made
    if (status === reqStatus.sent) {
      userStatus = reqStatus.sent;
      friendStatus = reqStatus.pending;
    } else if (status === reqStatus.accepted) {
      userStatus = reqStatus.accepted;
      friendStatus = reqStatus.accepted;
    } else if (status === reqStatus.rejected) {
      userStatus = reqStatus.rejected;
      friendStatus = reqStatus.rejected;
    }

    try {
      userRequest = {
        [`friendsRequests.${this.friendName}`]: {
          userEmail: this.friendEmail,
          userStatus: userStatus,
        },
      };
      friendsRequest = {
        [`friendsRequests.${userObj?.username}`]: {
          userEmail: userObj?.userEmail,
          userStatus: friendStatus,
        },
      };
      //update users friendsRequest obj
      await updateDoc(this.userRef, userRequest);
      //update friends friendsRequest obj
      await updateDoc(this.friendRef, friendsRequest);
    } catch (err) {
      throw new Error("Could send invitation");
    }
  }

  async friendListAddRemove(status: friendManage) {
    //TODO: add status management!
    let userRequest;
    let friendsRequest;
    const userService = new UserService();
    const userObj = await userService
      .getUserObject(this.currUserEmail)
      .then((username) => username);
    try {
      userRequest = {
        friendsList: arrayUnion({
          username: this.friendEmail,
          userEmail: this.friendEmail,
        }),
      };
      friendsRequest = {
        friendsList: arrayUnion({
          username: userObj?.username,
          userEmail: this.currUserEmail,
        }),
      };
      //update users friendsRequest obj
      await updateDoc(this.userRef, userRequest);
      //update friends friendsRequest obj
      await updateDoc(this.friendRef, friendsRequest);
    } catch (err) {
      throw new Error("Could send invitation");
    }
  }
  async getFriendList(userEmail: string) {
    const userDocRef = doc(db, "Users", userEmail);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data().friendsList;
    } else {
      return new Error();
    }
  }
}
