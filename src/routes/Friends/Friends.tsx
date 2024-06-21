import { useState } from "react";
import { findAccountsByName } from "../../services/searchForAccounts";
import { FriendsListComponent } from "./FriendsListComponent";
import { DocumentData } from "firebase/firestore";
import { FriendsRequests } from "./FriendsRequests";

export const Friends = () => {
  const [searchVal, setSearchVal] = useState("");
  const [accountsList, setAccountsList] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setNoResults(false);
    e.preventDefault();
    try {
      if (searchVal) {
        const accounts = await findAccountsByName(searchVal);
        if (accounts.length > 0) {
          setAccountsList(accounts);
        } else {
          setNoResults(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="friends-page">
      <form className="form-inline" onSubmit={search}>
        <input
          className="form-control"
          type="search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <FriendsListComponent {...{ accountsList, isLoading, noResults }} />
      <div>
        <br />
        <h4>FriendsList</h4>
        <FriendsRequests />
      </div>
    </div>
  );
};
