import { useEffect, useState } from "react";
import { auth } from "../services/config/firebase";
import { getCurrentUser } from "../services/login/getCurrentUser";

export const Account = () => {
  const [email, setEmail] = useState("");
  let userEmail;
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      userEmail = user.email;
      console.log(userEmail);
      setEmail(user?.email);
      
    });
  }, []);

  return (
    <div>
      <p>AccountPage</p>
      {email}
    </div>
  );
};
