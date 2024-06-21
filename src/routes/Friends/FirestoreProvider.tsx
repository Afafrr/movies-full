// FirestoreContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/config/firebase";

const FirestoreContext = createContext("");

export const useFirestore = () => useContext(FirestoreContext);

export const FirestoreProvider = ({ children, currUserEmail }) => {
  const [friendRequests, setFriendRequests] = useState();

  useEffect(() => {
    let unsubscribe;
    if (currUserEmail) {
      unsubscribe = onSnapshot(
        doc(db, "Users", currUserEmail),
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const requests = data.friendsRequests || {};
            setFriendRequests(requests);
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error fetching friend requests: ", error);
        }
      );
    }
    // Cleanup subscription on unmount
    return unsubscribe;
  }, [currUserEmail]);

  return (
    <FirestoreContext.Provider value={{ friendRequests }}>
      {children}
    </FirestoreContext.Provider>
  );
};
