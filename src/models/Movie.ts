import { Genre } from ".";

export interface Movie {
	id: number;
	name: string;
	score: number;
	releaseDate: string;
	img: {
		url: string;
	}
	genres: Genre[];
	similar: Movie[];
}
