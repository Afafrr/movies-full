import { useQuery } from "@tanstack/react-query";
import { options } from "../services/config/TMDB";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../components/Spinner";
import { PostService } from "../services/postService";
import { useOutletContext } from "react-router-dom";

export const CreatePost = () => {
  const [searchVal, setSearchVal] = useState("");
  const [showList, setShowList] = useState(false);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const btnRef = useRef(null);
  const { currUserEmail }: { currUserEmail: string } = useOutletContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["movieSearch"],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=true&language=en-US&page=1`,
        options
      ).then((res) => res.json()),
  });

  const search = () => {
    refetch();
  };
  const addMovie = (res) => {
    setSearchVal(res.title);
  };

  const addPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addPost = new PostService(currUserEmail);
    const ratingNum = Number(rating);
    const postObj = {
      movieName: searchVal,
      rating: ratingNum,
      description: description,
    };
    try {
      addPost.addPost(postObj);
    } catch (error) {}
    setSearchVal("");
    setRating("");
    setDescription("");
  };

  let first10res = data?.results.slice(0, 11);
  const resultList = first10res?.map((res) => {
    return (
      <li
        className="list-group-item"
        key={res.id}
        onClick={() => addMovie(res)}
      >
        {res.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200/${res.poster_path}`}
            alt={`${res.title} poster`}
            className="image"
          />
        ) : (
          "No img"
        )}

        <div className="description">
          <p className="title">
            {res.title} ({res.release_date})
          </p>
          <p className="org-title">org: {res.original_title}</p>
        </div>
      </li>
    );
  });

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [btnRef]);

  const handleOutsideClick = (e) => {
    if (btnRef.current && !btnRef.current.contains(e.target))
      setShowList(false);
    else setShowList(true);
  };

  return (
    <div className="create-post" onClick={handleOutsideClick}>
      <form onSubmit={addPost}>
        <h3>Create post</h3>
        <div className="form-row">
          <label>Find movie</label>
          <div className="search-bar">
            <input
              className="form-control"
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search"
              aria-label="Search"
              required
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={search}
              ref={btnRef}
            >
              Search
            </button>
          </div>
          {showList &&
            (isLoading ? (
              Spinner
            ) : (
              <div className="search-res-list">
                <ul className="list-group list-group-flush">{resultList}</ul>
              </div>
            ))}
          <div className="col">
            <label>Rating </label>
            <input
              type="number"
              min={0}
              max={5}
              className="form-control"
              onChange={(e) => setRating(e.target.value)}
              placeholder="Number from 0 to 5"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              maxLength={100}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-dark">
          Add Post
        </button>
      </form>
    </div>
  );
};
