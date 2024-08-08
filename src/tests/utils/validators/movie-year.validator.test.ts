import {validateMovieYear} from '../../../utils/validators/movie-year.validator';

describe('validateMovieYear', () => {
	it('should return false if year is not a number', () => {
		expect(validateMovieYear('2020')).toBe(false);
		expect(validateMovieYear(null)).toBe(false);
		expect(validateMovieYear(undefined)).toBe(false);
		expect(validateMovieYear({})).toBe(false);
	});

	it('should return false if year is less than 1888', () => {
		expect(validateMovieYear(1887)).toBe(false);
	});

	it('should return false if year is greater than the current year plus 2', () => {
		const futureYear = new Date().getFullYear() + 3;
		expect(validateMovieYear(futureYear)).toBe(false);
	});

	it('should return true if year is between 1888 and the current year plus 2', () => {
		expect(validateMovieYear(1888)).toBe(true);
		expect(validateMovieYear(new Date().getFullYear())).toBe(true);
		expect(validateMovieYear(new Date().getFullYear() + 2)).toBe(true);
	});
});
