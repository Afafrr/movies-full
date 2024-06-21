import { auth } from "../config/firebase";

export const getCurrentUser = () => {
  let userEmail;
  const user2 = auth.currentUser;
  auth.onAuthStateChanged((user) => {
    userEmail = user?.email;
    console.log(userEmail);
  });
  console.log(userEmail);

  const user = auth;
  return user;
};
