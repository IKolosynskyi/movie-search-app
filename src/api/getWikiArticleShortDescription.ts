import axios from "axios";

const wikiUrl = process.env.REACT_APP_WIKI_BASE_URL;
const wikiActionApi = process.env.REACT_APP_WIKI_ACTION_API;

interface GetWikiArcticleShortDescriptionResponse {
	error: string;
	query: {
		pages: { extract: string }[]
	}
}

export async function getWikiArcticleShortDescription(pageId: number) {
	const { data } = await axios.get<GetWikiArcticleShortDescriptionResponse>(`${wikiUrl}/${wikiActionApi}?action=query&format=json&prop=extracts&pageids=${pageId}&formatversion=2&exsentences=3&exlimit=1&explaintext=1&origin=*`);

	if (data.error) {
		alert(data.error);
		throw data.error;
	}
	return data.query.pages[0];
}