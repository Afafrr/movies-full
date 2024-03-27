import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "./config/firebase";

export const findAccountsByName = async (usernameQuery: string) => {
  const usersRef = collection(db, "Users");
  const trimmedLowerUsername = usernameQuery.trim().toLowerCase();
  const docArray: any = [];

  const q = query(
    usersRef,
    orderBy("usernameLowercased"),
    startAt(trimmedLowerUsername),
    endAt(trimmedLowerUsername + "\uf8ff")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    docArray.push(doc.data());
    console.log(doc.data());
  });
  return docArray;
};
