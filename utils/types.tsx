export interface MovieBase {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
  popularity: number;
  genre_ids: number[];
  vote_average: number;
}
