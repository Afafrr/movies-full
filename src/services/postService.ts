import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config/firebase";

type Post = {
  movieName: string;
  rating: number;
  description: string;
};
export class PostService {
  currUserEmail;
  userRef;
  constructor(currUserEmail: string) {
    this.currUserEmail = currUserEmail;
    this.userRef = doc(db, "Users", this.currUserEmail);
  }

  async addPost(data: Post) {
    try {
      const postUpdate = {
        posts: arrayUnion({
          ...data,
          createdAt: Date.now(),
        }),
      };
      await updateDoc(this.userRef, postUpdate);
    } catch (err) {}
  }

  async getFriendsPosts() {
    const userDocRef = doc(db, "Users", this.currUserEmail);
    try {
      const docSnap = await getDoc(userDocRef);
      const friendsList = docSnap.data()?.friendsList;

      const friendsPostsArr = friendsList.map(async (friend) => {
        const friendEmail = friend.userEmail;
        const userDocRef = doc(db, "Users", friendEmail);
        const docSnap = await getDoc(userDocRef);
        const postsArr = docSnap.data()?.posts;
        if (postsArr) {
          postsArr?.forEach((post) => {
            post.username = friend.username;
          });
          return postsArr;
        } else {
          return [];
        }
      });
      const results = await Promise.all(friendsPostsArr);

      return results.flat().sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {}
  }
}
