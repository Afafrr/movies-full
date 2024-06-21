import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db, auth } from "./config/firebase";
import { DocumentData } from "firebase/firestore";

export const findAccountsByName = async (username: string) => {
  const usersRef = collection(db, "Users");
  const docArray: DocumentData[] = [];
  const usernameLower = username.toLowerCase();
  //find accounts that contain written string
  const q = query(
    usersRef,
    orderBy("usernameLowercased"),
    startAt(usernameLower),
    endAt(usernameLower + "\uf8ff")
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.userEmail !== auth.currentUser?.email) {
      docArray.push(data);
    }
  });
  return docArray;
};
