import { useEffect, useState } from "react";
import { useFirestore } from "./FirestoreProvider";
import { FriendsService, reqStatus } from "../../services/friendsService";
import { useOutletContext } from "react-router-dom";
import { friendManage } from "../../services/friendsService";

export const FriendsRequests = () => {
  const { friendRequests } = useFirestore();
  const [reqArr, setReqArr] = useState<any>([]);
  const { currUserEmail }: { currUserEmail: string } = useOutletContext();

  useEffect(() => {
    if (friendRequests) {
      setReqArr(Object.entries(friendRequests));
    }
  }, [friendRequests]);

  const acceptFriend = (friendName: string, friendEmail: string) => {
    const friendsService = new FriendsService(
      currUserEmail,
      friendName,
      friendEmail
    );
    friendsService.changeFriendStatus(reqStatus.accepted);
    friendsService.friendListAddRemove(friendManage.add);
  };
  return (
    <div className="friend-requests">
      <ul>
        {reqArr.map((pair) => {
          const name = pair[0];
          const status = pair[1].userStatus;
          const email = pair[1].userEmail;
          return (
            <li key={name}>
              <span>{name}</span>
              {status === "pending" ? (
                <button
                  className="btn btn-dark"
                  onClick={() => acceptFriend(name, email)}
                >
                  Accept
                </button>
              ) : (
                <span>{status}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
