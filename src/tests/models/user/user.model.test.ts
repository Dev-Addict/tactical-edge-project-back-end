import * as mongoose from 'mongoose';

import {User, UserModel} from '../../../models/user/user.model';

describe('User Model', () => {
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
		await User.deleteMany({});
	});

	it('should create and save user successfully', async () => {
		const mockUser: UserModel = {
			email: 'name@domain.com',
			password: 'Test@123',
			visible: true,
		};

		const validUser = new User(mockUser);

		await validUser.save();

		expect(validUser._id).toBeDefined();
		expect(validUser.email).toBe(mockUser.email);
		expect(validUser.password).toBeDefined();
		expect(validUser.visible).toBe(mockUser.visible);
	});

	it('should not save user with invalid email', async () => {
		const mockUser: UserModel = {
			email: 'name@domain',
			password: 'Test@123',
			visible: true,
		};

		const invalidUser = new User(mockUser);

		await expect(invalidUser.save()).rejects.toThrow();
	});

	it('should not save user with invalid password', async () => {
		const mockUser: UserModel = {
			email: 'name@domain.com',
			password: 'test',
			visible: true,
		};

		const invalidUser = new User(mockUser);

		await expect(invalidUser.save()).rejects.toThrow();
	});

	it('should not save user with missing email', async () => {
		const mockUser: Omit<UserModel, 'email'> = {
			password: 'Test@123',
			visible: true,
		};

		const invalidUser = new User(mockUser);

		await expect(invalidUser.save()).rejects.toThrow();
	});

	it('should not save user with missing password', async () => {
		const mockUser: Omit<UserModel, 'password'> = {
			email: 'name@domain.com',
			visible: true,
		};

		const invalidUser = new User(mockUser);

		await expect(invalidUser.save()).rejects.toThrow();
	});

	it('should save user with missing visible', async () => {
		const mockUser: Omit<UserModel, 'visible'> = {
			email: 'name@domain.com',
			password: 'Test@123',
		};

		const validUser = new User(mockUser);

		await validUser.save();

		await expect(validUser.visible).toBeDefined();
	});

	it('should set the default value of visible to `false`', async () => {
		const mockUser: Omit<UserModel, 'visible'> = {
			email: 'name@domain.com',
			password: 'Test@123',
		};

		const validUser = new User(mockUser);

		await validUser.save();

		expect(validUser.visible).toBe(false);
	});

	it('should not save user with duplicate email', async () => {
		const mockUser: UserModel = {
			email: 'name@domain.com',
			password: 'Test@123',
			visible: true,
		};

		const firstUser = new User(mockUser);

		await firstUser.save();

		const secondUser = new User(mockUser);

		await expect(secondUser.save()).rejects.toThrow();
	});

	it('should encrypt the password before saving', async () => {
		const mockUser: UserModel = {
			email: 'name@domain.com',
			password: 'Test@123',
			visible: true,
		};

		const validUser = new User(mockUser);

		await validUser.save();

		expect(validUser.password).not.toBe(mockUser.password);
	});

	it('should compare the password correctly', async () => {
		const mockUser: UserModel = {
			email: 'name@domain.com',
			password: 'Test@123',
			visible: true,
		};

		const validUser = new User(mockUser);

		await validUser.save();

		expect(
			await validUser.correctPassword(mockUser.password, validUser.password)
		).toBe(true);
	});
});
