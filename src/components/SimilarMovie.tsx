import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_SIMILAR_MOVIE } from "../api/query";
import { Movie } from "../models";
import { SearchResult } from "./SearchResult";

interface MovieResponse {
  movie: Movie;
}

export const SimilarMovie: React.FC = () => {
  const { id } = useParams();
  const { loading, data } = useQuery<MovieResponse>(GET_SIMILAR_MOVIE, {
    variables: {
      id: id,
    },
  });

  const movies = data?.movie.similar;

  return <SearchResult movies={movies} loading={loading} />;
};
