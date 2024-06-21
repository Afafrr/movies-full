import { db } from "./config/firebase";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

export class UserService {
  private usersRef;
  constructor() {
    this.usersRef = collection(db, "Users");
  }

  //validates user and creates new user object with given username in db
  async createUserInDB(username: string, email: string): Promise<void> {
    try {
      //check if username exists in DB
      let unique = await this.checkIfUsernameUnique(username).then(
        (res) => res
      );
      if (unique) {
        throw new Error("Name is already taken");
      }
      //if username is unique create new document
      await setDoc(doc(this.usersRef, email), {
        username: username.trim(),
        usernameLowercased: username.trim().toLocaleLowerCase(),
        userEmail: email,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async checkIfUsernameUnique(username: string | null) {
    const q = query(this.usersRef, where("username", "==", username));
    try {
      //check if there is a document with given email
      const querySnapshot = await getDocs(q);
      return querySnapshot.size !== 0;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserObject(email: string) {
    const userDocRef = doc(db, "Users", `${email}`);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
}
