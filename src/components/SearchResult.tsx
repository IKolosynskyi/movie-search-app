import { Backdrop, CircularProgress } from "@mui/material";
import { Movie } from "../models/Movie";
import { MovieList } from "./movie";

type Props = {
  movies: Movie[] | undefined;
  loading: boolean;
};

const movieNotFound = "No films found for your query";

export const SearchResult: React.FC<Props> = ({ loading, movies }) => {
  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {(!!movies && <MovieList movies={movies} />) ||
        (!loading && <>{movieNotFound}</>)}
    </>
  );
};
