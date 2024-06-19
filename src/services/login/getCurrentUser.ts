import { auth } from "../config/firebase";

export const getCurrentUser = () => {
  let userEmail;
  auth.onAuthStateChanged((user) => {
    userEmail = user?.email;
    console.log(userEmail);
  });

  const user = auth;
  return user;
};
