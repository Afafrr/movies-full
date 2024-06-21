import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/config/firebase";
import { useOutletContext } from "react-router-dom";
import { PostService } from "../services/postService";

type Post = {
  description: string;
  rating: number;
  movieName: string;
  createdAt: number;
  username: string;
};

export const Dashboard = () => {
  const { currUserEmail }: { currUserEmail: string } = useOutletContext();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    let unsubscribe;
    if (currUserEmail) {
      const postService = new PostService(currUserEmail);
      const q = query(collection(db, "Users"), where("posts", "!=", []));

      unsubscribe = onSnapshot(q, async () => {
        try {
          const posts = await postService.getFriendsPosts();
          setPosts(posts);
          console.log(posts);
        } catch (error) {}
      });
    }
    return unsubscribe;
  }, [currUserEmail]);

  return (
    <div className="posts">
      <ul className="list-group list-group-flush">
        {posts?.map((post) => {
          return (
            <li className="list-group-item" key={post.username}>
              <p>
                {post.username} rated movie as ({post.rating}/5)
              </p>
              <h4 className="title">{post.movieName}</h4>
              <p className="comment">Comment:</p>
              <span> {post.description}</span>
              <p className="date">Date: {Date(post.createdAt).slice(0, 21)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
