import { useState } from "react";
import { findAccountByName } from "../services/searchForAccounts";
type account = { username: string; userEmail: string };

export const Friends = () => {
  const [searchVal, setSearchVal] = useState("");
  const [accountsList, setAccountsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (searchVal) {
        const accounts = await findAccountByName(searchVal);
        setAccountsList(accounts);
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
      <div className="accounts-list">
        <ul>
          {accountsList.map((account) => {
            return (
              <li key={account.username}>
                <p>{account.username}</p>
              </li>
            );
          })}
        </ul>
      </div>
      {isLoading && <div>LOADING</div>}
    </div>
  );
};
