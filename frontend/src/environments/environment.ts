export interface Environment {
	apiKey: string;
	apiToken: string;
	apiBaseUrl: string;
	imageBaseUrl: string;
}

export const environment: Environment = {
	apiKey: 'YOUR_API_KEY_HERE',
	apiToken: 'YOUR_API_TOKEN_HERE',
	apiBaseUrl: 'https://api.themoviedb.org/3',
	imageBaseUrl: 'https://image.tmdb.org/t/p'
};