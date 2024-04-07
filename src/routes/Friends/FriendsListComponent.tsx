//types
import { account } from "./Friends";
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
  const spinner = (
    <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>
  );

  const usersList = accountsList.map((account: account) => {
    return (
      <li key={account.username}>
        <p>{account.username}</p>
      </li>
    );
  });

  const noResultsInfo = <p>Couldn't find such user</p>;
  const listComponent = <ul>{noResults ? noResultsInfo : usersList}</ul>;

  return (
    <div className="accounts-list">{isLoading ? spinner : listComponent}</div>
  );
};
