import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "./config/firebase";
import { orderByChild } from "firebase/database";

export const findAccountByName = async (usernameQuery: string) => {
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
