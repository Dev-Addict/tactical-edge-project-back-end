import * as mongoose from 'mongoose';

import {Image, ImageModel} from '../../../models/media/image.model';

describe('Image Model', () => {
	beforeAll(async () => {
		const uri = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_NETWORK_PORT}`;

		await mongoose.connect(uri, {
			authSource: 'admin',
		});
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});

	beforeEach(async () => {
		await Image.deleteMany({});
	});

	it('should create and save image successfully', async () => {
		const mockImage: ImageModel = {
			width: 1920,
			height: 1080,
			src: 'http://example.com/image.jpg',
		};

		const validImage = new Image(mockImage);

		await validImage.save();

		expect(validImage._id).toBeDefined();
		expect(validImage.width).toBe(mockImage.width);
		expect(validImage.height).toBe(mockImage.height);
		expect(validImage.src).toBe(mockImage.src);
	});

	it('should not save image with missing width', async () => {
		const mockImage: Omit<ImageModel, 'width'> = {
			height: 1080,
			src: 'http://example.com/image.jpg',
		};

		const invalidImage = new Image(mockImage);

		await expect(invalidImage.save()).rejects.toThrow();
	});

	it('should not save image with missing height', async () => {
		const mockImage: Omit<ImageModel, 'height'> = {
			width: 1920,
			src: 'http://example.com/image.jpg',
		};

		const invalidImage = new Image(mockImage);

		await expect(invalidImage.save()).rejects.toThrow();
	});

	it('should not save image with missing src', async () => {
		const mockImage: Omit<ImageModel, 'src'> = {
			width: 1920,
			height: 1080,
		};

		const invalidImage = new Image(mockImage);

		await expect(invalidImage.save()).rejects.toThrow();
	});
});
