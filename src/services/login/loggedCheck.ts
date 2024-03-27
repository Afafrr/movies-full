import { auth } from "../config/firebase";

export const f = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      sessionStorage.setItem("logged", "true");
    } else {
      sessionStorage.setItem("logged", "false");
    }
  });
};
