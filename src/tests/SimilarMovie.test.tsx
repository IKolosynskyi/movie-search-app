import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { wait } from "@testing-library/user-event/dist/utils";
import { GET_SIMILAR_MOVIE } from "../api/query";
import { SimilarMovie } from "../components/SimilarMovie";

const mocks = [
  {
    request: {
      query: GET_SIMILAR_MOVIE,
      variables: {
        id: undefined,
      },
    },
    result: {
      data: {
        movie: {
          similar: [
            {
              id: 1,
              name: "Spider-man",
              score: 10,
              genres: [{ name: "action" }],
              img: {
                url: "",
              },
              releaseDate: "",
            },
          ],
        },
      },
    },
  },
];

test("render similar movie apge and display similar movie list", async () => {
  render(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <SimilarMovie />
      </MockedProvider>
    </BrowserRouter>
  );

  await act(wait);
  const title = await screen.findByText("Spider-man");
  const genre = await screen.findByText("action");

  expect(title).toBeInTheDocument();
  expect(genre).toBeInTheDocument();
});
