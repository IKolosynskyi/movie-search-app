import axios from "axios";

const wikiUrl = process.env.REACT_APP_WIKI_BASE_URL;
const wikiRestApi = process.env.REACT_APP_WIKI_REST_API;

interface FindWikiArticleResponse {
	pages: {
		id: number,
		key: string;
	}[]
}

export async function findWikiArticle(movieName: string, movieYear: number) {
	const { data } = await axios.get<FindWikiArticleResponse>(`${wikiUrl}/${wikiRestApi}/search/page?q=${movieName} ${movieYear}&limit=1`);
	return data.pages[0];
}