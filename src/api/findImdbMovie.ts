import axios from "axios";
const imdbApi = process.env.REACT_APP_IMDB_API;
const imdbApiKey = process.env.REACT_APP_IMDB_API_KEY;

interface FindImdbMovieResponse {
	errorMessage: string;
	results: {
		id: string
	}[]
}

export async function findImdbMovie(movieExpresion: string) {
	const { data } = await axios.get<FindImdbMovieResponse>(`${imdbApi}/${imdbApiKey}/${movieExpresion}`);
	if (data.errorMessage) {
		alert(data.errorMessage);
		throw data.errorMessage;
	}

	if (data.results.length === 0) {
		return undefined;
	}

	return data.results[0];
}