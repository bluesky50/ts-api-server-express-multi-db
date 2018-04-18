import Config from '../configs/config';
import mongoose from 'mongoose';

class MongoAdapter implements IDBAdapter {

	public MONGO_URI: string = "mongodb://localhost/example-ts-api-server";
	

	public DB_URI: string;
	public db = mongoose;

	constructor(appName: string) {
		this.DB_URI = 'mongodb://localhost:27017/' + appName;
	}

	connect() {
		// mongoose.connect(this.DB_URI);
		console.log(`MongoDB: Connecting to database @${this.DB_URI}...`);
	}

	getDb() {
		return this.db;
	}
}

export default MongoAdapter;