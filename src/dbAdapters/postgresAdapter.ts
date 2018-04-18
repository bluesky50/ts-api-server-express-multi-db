class PostgresAdapter implements IDBAdapter {
	public DB_URI: string;
	public db = {};

	constructor(appName: string) {
		this.DB_URI = 'postgresdb://localhost/' + appName;
	}

	connect() {
		console.log(`Postgres: Connecting to database @${this.DB_URI}...`);
	}
	
	getDb() {
		return this.db;
	}
}

export default PostgresAdapter;