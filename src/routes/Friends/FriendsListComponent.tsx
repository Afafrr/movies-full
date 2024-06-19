//types
import { account } from "./Friends";
import { Spinner } from "../../components/Spinner";

type props = {
  accountsList: account[];
  isLoading: boolean;
  noResults: boolean;
};

export const FriendsListComponent = ({
  accountsList,
  isLoading,
  noResults,
}: props) => {
  const usersList = accountsList.map((account: account) => {
    return (
      <li key={account.username}>
        <p>{account.username}</p>
        <button onClick={}>Add to friend list</button>
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
