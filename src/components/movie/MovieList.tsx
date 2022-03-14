import { Stack } from "@mui/material";
import { Movie } from "../../models/Movie";
import { MovieItem } from "./MovieItem";

type Props = {
  movies: Movie[];
};

export const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <Stack spacing={2}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </Stack>
  );
};
