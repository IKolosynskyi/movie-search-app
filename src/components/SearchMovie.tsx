import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { FIND_MOVIES } from "../api/query";
import { Movie } from "../models";
import { SearchResult } from "./SearchResult";

interface SearchMovies {
  searchMovies: Movie[];
}

export const SearchMovie: React.FC = () => {
  const [searchParams] = useSearchParams();

  const { loading, data } = useQuery<SearchMovies>(FIND_MOVIES, {
    variables: {
      query: searchParams.get("name"),
    },
  });

  const movies = data?.searchMovies;
  return <SearchResult movies={movies} loading={loading} />;
};
