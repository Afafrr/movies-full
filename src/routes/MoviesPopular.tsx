import { useQuery } from "@tanstack/react-query";
import { options } from "../services/config/TMDB";
import { useEffect, useState } from "react";
type movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export const MoviesPopular = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["movieSearch"],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options
      ).then((res) => res.json()),
  });
  console.log(data);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <div className="popular-movies">
      {isLoading ? "LOADING" : null}
      <div>
        {data?.results.map((el: movie) => {
          return (
            <div key={el.id} className="movie-list-el">
              <img
                src={`https://image.tmdb.org/t/p/w200/${el.poster_path}`}
                alt={`${el.title} poster`}
                className="image"
              />
              <div className="info">
                <h2>
                  {el.title} ({el.release_date.slice(0, 4)})
                </h2>
                <dd>{el.overview.slice(0, 100)}...</dd>
                <p>
                  Rating:
                  {" " + el.vote_average.toFixed(1)}, votes:
                  {" " + el.vote_count}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => setPage(1)}>
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => setPage(2)}>
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => setPage(3)}>
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
