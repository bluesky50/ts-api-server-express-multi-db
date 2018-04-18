import Sequelize from 'sequelize';

class SqliteAdapter implements IDBAdapter {
	public DB_URI: string;
	public db: any;
	// public db = sqlite3.verbose().Database(':memory:');

	constructor(appName: string) {
		this.DB_URI = 'sqlite://localhost/' + appName;
		this.db = new Sequelize('database', 'username', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			operatorsAliases: false,
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			},
			storage: ':memory:'
		});

	}

	connect() {
 		this.db.authenticate()
			.then(() => {
				console.log('Connection has been established to sqlite db.');
			})
			.catch((err) => {
				console.log('Unable to connect to the sqlite db');
			});
		// this.db = new (sqlite3.verbose()).Database(':memory:', (err: any) => {
		// 	if (err) {
		// 		return console.error(err.message);
		// 	}
		// 	// console.log(`Ne: Connected to database @${this.DB_URI}...`);
		// 	console.log(`SQLite: Connected to database @${this.DB_URI}...`);
		// });
	}

	getDb() {
		return this.db;
	}
}

export default SqliteAdapter;