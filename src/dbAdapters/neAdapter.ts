import Datastore from 'nedb';

class NeAdapter implements IDBAdapter {
	public DB_URI: string;
	public db: any;

	constructor(appName: string) {
		this.DB_URI = 'nedb://localhost/' + appName;
		this.db = {};
		this.db.users = new Datastore();
		this.db.posts = new Datastore();
	}
	
	connect() {
		// this.db.users = new Datastore('path/to/users.db');
		// this.db.users.loadDatabase();
		console.log(`Connected NeDB to database <memory>`);
	}

	getDb() {
		return this.db;
	}
}

export default NeAdapter;