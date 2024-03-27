import { useEffect, useState } from "react";
import { auth } from "../services/config/firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const Account = () => {
  const [username, setUsername] = useState<string | null | undefined>("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsername(user?.displayName);
      console.log(user);
    });
  }, []);

  return (
    <div>
      {username}
      AccountPage
    </div>
  );
};
