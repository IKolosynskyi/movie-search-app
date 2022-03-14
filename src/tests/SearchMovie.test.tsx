import { render, screen } from "@testing-library/react";
import { SearchMovie } from "../components";
import { MockedProvider } from "@apollo/react-testing";
import { FIND_MOVIES } from "../api/query";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { wait } from "@testing-library/user-event/dist/utils";

const mocks = [
  {
    request: {
      query: FIND_MOVIES,
      variables: {
        query: null,
      },
    },
    result: {
      data: {
        searchMovies: [
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
];

test("render search movie page and dispaly movie list", async () => {
  render(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchMovie />
      </MockedProvider>
    </BrowserRouter>
  );

  await act(wait);
  const title = await screen.findByText("Spider-man");
  const genre = await screen.findByText("action");

  expect(title).toBeInTheDocument();
  expect(genre).toBeInTheDocument();
});
