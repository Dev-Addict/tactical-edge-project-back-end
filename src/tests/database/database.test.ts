import {MongoClient, Db, ObjectId} from 'mongodb';

const mockUser = {
	_id: new ObjectId(),
	name: 'John Doe',
	email: 'johndoe@email.com',
};

const mockUpdatedUser = {
	...mockUser,
	name: 'Jane Doe',
	email: 'janedoe@email.com',
};

describe('Database', () => {
	let connection: MongoClient;
	let db: Db;

	beforeAll(async () => {
		const uri = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_NETWORK_PORT}`;

		connection = await MongoClient.connect(uri, {
			authSource: 'admin',
		});

		db = connection.db(process.env.DATABASE_NAME);
	});

	afterAll(async () => {
		await db.dropDatabase();
		await connection.close();
	});

	it('should connect to the database', async () => {
		expect(db).toBeDefined();
	});

	it('should be able to create a new collection', async () => {
		const users = await db.createCollection('users');
		expect(users).toBeDefined();
	});

	it('should be able to insert a new document into the collection', async () => {
		const users = await db.collection('users');

		await users.insertOne(mockUser);

		const insertedUser = await users.findOne({_id: mockUser._id});

		expect(insertedUser).toEqual(mockUser);
	});

	it('should be able to update a document in the collection', async () => {
		const users = await db.collection('users');

		const updatedUser = await users.findOneAndUpdate(
			{_id: mockUser._id},
			{$set: mockUpdatedUser},
			{returnDocument: 'after'}
		);

		expect(updatedUser).toEqual(mockUpdatedUser);
	});

	it('should be able to delete a document from the collection', async () => {
		const users = await db.collection('users');

		const deletedUser = await users.findOneAndDelete({_id: mockUser._id});

		expect(deletedUser).toEqual(mockUpdatedUser);
	});

	it('should be able to drop a collection', async () => {
		const users = await db.collection('users');

		await users.drop();

		const collections = await db.listCollections().toArray();

		expect(collections).toEqual([]);
	});
});
