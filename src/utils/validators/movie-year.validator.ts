export const validateMovieYear = (year: unknown): boolean => {
	if (typeof year !== 'number') return false;

	return year >= 1888 && year <= new Date().getFullYear() + 2;
};
