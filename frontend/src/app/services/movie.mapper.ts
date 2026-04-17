import {
  ApiMovie,
  ApiMovieListResponse,
  ApiMovieDetails,
  ApiCredits,
  ApiVideos,
  ApiReviews,
} from '../model/movie-api.models';
import type {
  Movie,
  MovieDetails,
  Actor,
  Person,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  Review,
  MovieImages,
} from '../model/movie.model';
export class MovieMapper {
  static toMovie(api: ApiMovie, imageBaseUrl: string): Movie {
    return {
      id: api.id,
      title: api.title,
      posterUrl: api.poster_path ? `${imageBaseUrl}/w500${api.poster_path}` : '',
      backdropUrl: api.backdrop_path ? `${imageBaseUrl}/original${api.backdrop_path}` : undefined,
      year: api.release_date ? new Date(api.release_date).getFullYear() : 0,
      rating: api.vote_average,
      description: api.overview,
      adult: api.adult,
      language: api.original_language,
      popularity: api.popularity,
    };
  }
  static toMoviesList(response: ApiMovieListResponse, imageBaseUrl: string): Movie[] {
    return response.results.map(movie => this.toMovie(movie, imageBaseUrl));
  }
  static toMovieDetails(
    api: ApiMovieDetails,
    imageBaseUrl: string,
    credits?: ApiCredits,
    videos?: ApiVideos,
    reviews?: ApiReviews
  ): MovieDetails {
    const actors: Actor[] = credits?.cast
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .slice(0, 10)
      .map(c => this.toActor(c, imageBaseUrl)) ?? [];

    const directorCrew = credits?.crew.find(c => c.job === 'Director');
    const director: Person | undefined = directorCrew ? this.toPerson(directorCrew) : undefined;

    const trailerKey: string | undefined = videos?.results?.find(
      v => v.site === 'YouTube' && v.type === 'Trailer'
    )?.key;

    const domainReviews: Review[] = reviews?.results.map(r => ({
      author: r.author,
      authorDetails: {
        name: r.author_details.name,
        username: r.author_details.username,
        avatarUrl: r.author_details.avatar_path ? `${imageBaseUrl}/w45${r.author_details.avatar_path}` : undefined,
        rating: r.author_details.rating,
      },
      content: r.content,
      createdAt: r.created_at,
      id: r.id,
      updatedAt: r.updated_at,
      url: r.url,
    })) ?? [];

    return {
      ...this.toMovie(api, imageBaseUrl),
      backdropUrl: api.backdrop_path ? `${imageBaseUrl}/original${api.backdrop_path}` : undefined,
      runtime: api.runtime,
      genres: api.genres?.map(g => g.name),
      budget: api.budget,
      revenue: api.revenue,
      homepage: api.homepage,
      tagline: api.tagline,
      status: api.status,
      actors,
      director,
      trailerKey,
      productionCompanies: api.production_companies?.map(c => ({
        id: c.id,
        name: c.name,
        logoUrl: c.logo_path ? `${imageBaseUrl}/w200${c.logo_path}` : undefined,
        originCountry: c.origin_country,
      })),
      productionCountries: api.production_countries?.map(c => ({
        isoCode: c.iso_3166_1,
        name: c.name,
      })),
      spokenLanguages: api.spoken_languages?.map(l => ({
        isoCode: l.iso_639_1,
        name: l.name,
      })),
      images: { posters: [], backdrops: [] },
      reviews: domainReviews,
    };
  }
  static toActor(api: any, imageBaseUrl: string): Actor {
    return {
      id: api.id,
      name: api.name,
      character: api.character,
      profileUrl: api.profile_path ? `${imageBaseUrl}/w300${api.profile_path}` : undefined,
    };
  }
  static toPerson(api: any): Person {
    return {
      id: api.id,
      name: api.name,
    };
  }
}
