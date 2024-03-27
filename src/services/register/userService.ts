import { db } from "../config/firebase";
import {
  collection,
  setDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth } from "../config/firebase";

export class UserService {
  private usersRef;
  private currUserEmail;
  constructor() {
    this.usersRef = collection(db, "Users");
    this.currUserEmail = auth.currentUser?.email;
  }

  //validates user and creates new user object with given username in db
  async createUserInDB(username: string): Promise<void> {
    const trimmedLowerUsername = username.trim().toLowerCase();
    const docRef = doc(db, "Users", trimmedLowerUsername);

    try {
      if (this.currUserEmail == null) {
        throw new Error("User not logged in! ");
      }
      //check if username exists in DB
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        throw new Error("Username is already taken");
      }

      //check if user already has created username, searching by email address
      if (await this.checkIfEmailHasUsername(this.currUserEmail)) {
        throw new Error("Such user already has username set");
      }
      //if username is unique create new username object in DB
      await setDoc(doc(this.usersRef, trimmedLowerUsername), {
        username: username.trim(),
        userEmail: this.currUserEmail,
        usernameLowercased: trimmedLowerUsername,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async checkIfEmailHasUsername(currUserEmail: string | null) {
    const q = query(this.usersRef, where("userEmail", "==", currUserEmail));
    let userExists;
    try {
      //check if there is a document with given email
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size === 0) {
        userExists = false;
      } else {
        userExists = true;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
    return userExists;
  }
}
