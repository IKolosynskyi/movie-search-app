import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { Movie } from "../../models/Movie";
import {
  findWikiArticle,
  getWikiArcticleShortDescription,
  findImdbMovie,
} from "../../api";
import { useNavigate } from "react-router";

type Props = {
  movie: Movie;
};

const notFoundWikiArticle = "Cannot find short description for this movie";

export const MovieItem: React.FC<Props> = ({ movie }) => {
  const [shortDescription, setShortDescription] = useState<string>();
  const [wikiArticle, setWikiArticle] = useState<{ key: string }>();
  const [imdbMovieId, setImdbMovieId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigate();

  async function loadWikiInfo() {
    setLoading(true);
    try {
      const wikiArticle = await findWikiArticle(
        movie.name,
        new Date(movie.releaseDate).getFullYear()
      );

      if (wikiArticle) {
        setWikiArticle(wikiArticle);

        const result = await Promise.all([
          getWikiArcticleShortDescription(wikiArticle.id),
          findImdbMovie(
            `${movie.name} ${new Date(movie.releaseDate).getFullYear()}`
          ),
        ]);

        const shortDescription = result[0];
        const imdbMovie = result[1];

        setShortDescription(
          shortDescription ? shortDescription.extract : notFoundWikiArticle
        );

        setImdbMovieId(imdbMovie?.id);
      }
    } catch (error) {
      alert(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <MovieCard>
      <ImageContainer>
        <img src={movie.img.url} alt="" />
      </ImageContainer>
      <ContentContainer>
        <MovieTitle
          variant="h5"
          gutterBottom
          component="div"
          onClick={loadWikiInfo}
        >
          {movie.name}
        </MovieTitle>
        <Stack spacing={2} direction="row">
          {movie.genres.map((item, index) => (
            <Tag key={index}>
              <Typography>{item.name}</Typography>
            </Tag>
          ))}
        </Stack>
        <InfoBlock>
          <StyledRating max={10} value={movie.score} precision={0.5} readOnly />
          {!loading && (
            <>
              {wikiArticle && (
                <Link
                  marginRight={1}
                  href={`https://en.wikipedia.org/wiki/${wikiArticle?.key}`}
                  target="_blank"
                >
                  Wiki
                </Link>
              )}
              {imdbMovieId && (
                <Link
                  marginRight={1}
                  target="_blank"
                  href={`https://www.imdb.com/title/${imdbMovieId}`}
                >
                  Imdb
                </Link>
              )}
            </>
          )}
          <Button
            variant="contained"
            onClick={() => navigation(`/similar/${movie.id}`)}
          >
            Related
          </Button>
        </InfoBlock>
        {loading && <LoadingSvg color="inherit" />}

        {shortDescription && !loading && (
          <ShortDescription> {shortDescription} </ShortDescription>
        )}
      </ContentContainer>
    </MovieCard>
  );
};

const MovieCard = styled(Card)`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  max-height: 300px;
`;

const ImageContainer = styled("div")``;

const Tag = styled(Paper)`
  padding: 5px;
`;

const LoadingSvg = styled(CircularProgress)`
  align-self: center;
`;

const ContentContainer = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MovieTitle = styled(Typography)`
  font-size: 26px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const StyledRating = styled(Rating)`
  flex: 2 1 auto;
`;

const ShortDescription = styled(Typography)`
  overflow: auto;
`;

const InfoBlock = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
