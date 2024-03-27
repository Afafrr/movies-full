import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

export class Register {
  constructor(private email: string, private password: string) {
    this.email = email;
    this.password = password;
  }
  async registerWithEmailAndPassword() {
    return createUserWithEmailAndPassword(auth, this.email, this.password);
  }
  async registerWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }
}
