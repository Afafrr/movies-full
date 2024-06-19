import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db, auth } from "./config/firebase";

export const findAccountsByName = async (usernameQuery: string) => {
  const usersRef = collection(db, "Users");
  const trimmedLowerUsername = usernameQuery.trim().toLowerCase();
  const docArray: any = [];

  //find accounts that contain written string
  const q = query(
    usersRef,
    orderBy("usernameLowercased"),
    startAt(trimmedLowerUsername),
    endAt(trimmedLowerUsername + "\uf8ff")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.data());

    if (doc.data().userEmail !== auth.currentUser?.email) {
      docArray.push(doc.data());
    }
  });
  return docArray;
};
