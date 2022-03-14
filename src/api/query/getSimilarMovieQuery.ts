import { gql } from "@apollo/client";

export const GET_SIMILAR_MOVIE = gql`
	query getMovie($id: ID!) {
		movie(id: $id) {
			similar {
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
	}
`;