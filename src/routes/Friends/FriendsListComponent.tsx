import { useOutletContext } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { FriendsService } from "../../services/friendsService";
import { reqStatus } from "../../services/friendsService";

type props = {
  accountsList: any;
  isLoading: boolean;
  noResults: boolean;
};
type account = {
  username: string;
  userEmail: string;
  usernameLowercased: string;
};

export const FriendsListComponent = ({
  accountsList,
  isLoading,
  noResults,
}: props) => {
  const { currUserEmail }: { currUserEmail: string } = useOutletContext();

  const addFriend = (friendName: string, friendEmail: string) => {
    const friendsService = new FriendsService(
      currUserEmail,
      friendName,
      friendEmail
    );
    friendsService.changeFriendStatus(reqStatus.sent);
  };

  const usersList = accountsList.map((account: account) => {
    return (
      <li key={account.username} className="list-element">
        <span>{account.username}</span>
        <button
          className="btn btn-dark"
          onClick={() => addFriend(account.username, account.userEmail)}
        >
          Add to friend list
        </button>
      </li>
    );
  });

  const listComponent = (
    <ul>{noResults ? <p>Couldn't find such user</p> : usersList}</ul>
  );

  return (
    <div className="accounts-list">{isLoading ? Spinner : listComponent}</div>
  );
};
