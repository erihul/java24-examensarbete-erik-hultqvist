export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  year: number;
  rating: number;
  description: string;
  adult?: boolean;
  language?: string;
  popularity?: number;
}
export interface MovieDetails extends Movie {
  runtime?: number;
  genres?: string[];
  budget?: number;
  revenue?: number;
  homepage?: string;
  tagline?: string;
  status?: string;
  actors?: Actor[];
  director?: Person;
  trailerKey?: string;
  productionCompanies?: ProductionCompany[];
  productionCountries?: ProductionCountry[];
  spokenLanguages?: SpokenLanguage[];
  images?: MovieImages;
  reviews?: Review[];
}
export interface Actor {
  id: number;
  name: string;
  profileUrl?: string;
  character?: string;
}
export interface Person {
  id: number;
  name: string;
}
export interface ProductionCompany {
  id: number;
  name: string;
  logoUrl?: string;
  originCountry?: string;
}
export interface ProductionCountry {
  isoCode: string;
  name: string;
}
export interface SpokenLanguage {
  isoCode: string;
  name: string;
}
export interface MovieImages {
  posters: string[];
  backdrops: string[];
}
export interface Review {
  author: string;
  authorDetails: {
    name: string;
    username: string;
    avatarUrl?: string;
    rating?: number;
  };
  content: string;
  createdAt: string;
  id: string;
  updatedAt?: string;
  url?: string;
}
