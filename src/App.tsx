import { Container } from "@mui/material";
import { Route, Routes } from "react-router";
import { SearchBox, SearchMovie } from "./components";
import { SimilarMovie } from "./components/SimilarMovie";

function App() {
  return (
    <Container maxWidth={"md"}>
      <SearchBox />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="search" element={<SearchMovie />} />
        <Route path="similar/:id" element={<SimilarMovie />} />
      </Routes>
    </Container>
  );
}

export default App;
