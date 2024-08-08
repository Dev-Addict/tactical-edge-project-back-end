import * as mongoose from 'mongoose';

import {Movie, MovieModel} from '../../../models/movie/movie.model';
import {Image} from '../../../models/media/image.model';
import {User} from '../../../models/user/user.model';

describe('Movie Model', () => {
	beforeAll(async () => {
		const uri = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_NETWORK_PORT}`;
		await mongoose.connect(uri, {authSource: 'admin'});
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});

	beforeEach(async () => {
		await Movie.deleteMany({});
		await Image.deleteMany({});
		await User.deleteMany({});
	});

	it('should create and save movie successfully', async () => {
		const mockImage = new Image({
			width: 1920,
			height: 1080,
			src: 'http://example.com/image.jpg',
		});
		await mockImage.save();

		const mockUser = new User({
			email: 'user@example.com',
			password: 'Test@123',
		});
		await mockUser.save();

		const mockMovie: MovieModel = {
			title: 'Inception',
			year: 2010,
			coverId: mockImage.id,
			userId: mockUser.id,
		};

		const validMovie = new Movie(mockMovie);
		await validMovie.save();

		expect(validMovie._id).toBeDefined();
		expect(validMovie.title).toBe(mockMovie.title);
		expect(validMovie.year).toBe(mockMovie.year);
		expect(validMovie.coverId).toEqual(mockImage._id);
		expect(validMovie.userId).toEqual(mockUser._id);
	});

	it('should not save movie with missing title', async () => {
		const mockImage = new Image({
			width: 1920,
			height: 1080,
			src: 'http://example.com/image.jpg',
		});
		await mockImage.save();

		const mockUser = new User({
			email: 'user@example.com',
			password: 'Test@123',
		});
		await mockUser.save();

		const mockMovie: Omit<MovieModel, 'title'> = {
			year: 2010,
			coverId: mockImage.id,
			userId: mockUser.id,
		};

		const invalidMovie = new Movie(mockMovie);
		await expect(invalidMovie.save()).rejects.toThrow();
	});

	it('should not save movie with missing year', async () => {
		const mockImage = new Image({
			width: 1920,
			height: 1080,
			src: 'http://example.com/image.jpg',
		});
		await mockImage.save();

		const mockUser = new User({
			email: 'user@example.com',
			password: 'Test@123',
		});
		await mockUser.save();

		const mockMovie: Omit<MovieModel, 'year'> = {
			title: 'Inception',
			coverId: mockImage.id,
			userId: mockUser.id,
		};

		const invalidMovie = new Movie(mockMovie);
		await expect(invalidMovie.save()).rejects.toThrow();
	});

	it('should not save movie with missing coverId', async () => {
		const mockUser = new User({
			email: 'user@example.com',
			password: 'Test@123',
		});
		await mockUser.save();

		const mockMovie: Omit<MovieModel, 'coverId'> = {
			title: 'Inception',
			year: 2010,
			userId: mockUser.id,
		};

		const invalidMovie = new Movie(mockMovie);
		await expect(invalidMovie.save()).rejects.toThrow();
	});

	it('should not save movie with missing userId', async () => {
		const mockImage = new Image({
			width: 1920,
			height: 1080,
			src: 'http://example.com/image.jpg',
		});
		await mockImage.save();

		const mockMovie: Omit<MovieModel, 'userId'> = {
			title: 'Inception',
			year: 2010,
			coverId: mockImage.id,
		};

		const invalidMovie = new Movie(mockMovie);
		await expect(invalidMovie.save()).rejects.toThrow();
	});

	it('should not save movie with invalid year', async () => {
		const mockImage = new Image({
			width: 1920,
			height: 1080,
			src: 'http://example.com/image.jpg',
		});
		await mockImage.save();

		const mockUser = new User({
			email: 'user@example.com',
			password: 'Test@123',
		});
		await mockUser.save();

		const mockMovie: MovieModel = {
			title: 'Inception',
			year: 1800,
			coverId: mockImage.id,
			userId: mockUser.id,
		};

		const invalidMovie = new Movie(mockMovie);
		await expect(invalidMovie.save()).rejects.toThrow();
	});
});
