export interface ApiMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  release_date: string;
  vote_average: number;
  adult?: boolean;
  original_language?: string;
  popularity?: number;
  overview: string;
}
export interface ApiMovieListResponse {
  results: ApiMovie[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}
export interface ApiMovieDetails extends ApiMovie {
  runtime?: number;
  genres?: { id: number; name: string }[];
  budget?: number;
  revenue?: number;
  homepage?: string;
  tagline?: string;
  status?: string;
  belongs_to_collection?: any;
  production_companies?: {
    id: number;
    logo_path?: string;
    name: string;
    origin_country?: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages?: {
    iso_639_1: string;
    name: string;
  }[];
}
export interface ApiCredits {
  cast: {
    id: number;
    name: string;
    profile_path?: string;
    character?: string;
    order?: number;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path?: string;
  }[];
}
export interface ApiVideos {
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
  }[];
}
export interface ApiReviews {
  id: number;
  page: number;
  results: {
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path?: string;
      rating?: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at?: string;
    url?: string;
  }[];
}
