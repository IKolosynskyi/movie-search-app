import { gql } from "@apollo/client";

export const FIND_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      name
      score
      genres {
        name
      }
      releaseDate
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }      
    }
  }
`;