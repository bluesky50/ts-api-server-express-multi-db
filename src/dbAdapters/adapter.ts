import Sqlite from './sqliteAdapter';
import Postgres from './postgresAdapter';
import Mongo from './mongoAdapter';
import Ne from './neAdapter';

import ServerConfig from '../configs/config';

const databaseAdapter = ((db: string, appName: string): IDBAdapter => {	
	let database;
	// return (() => {
		if (!database) {
			switch(db) {
				case 'sqlite':
					database = new Sqlite(appName);
					return database;
				case 'mongo':
					database = new Mongo(appName);
					return database;
				case 'postgres':
					database = new Postgres(appName);
					return database;
				case 'ne':
					database = new Ne(appName);
					return database;
				default: 
					database = new Ne(appName);
					return database;
			}
		} else {
			return database;
		}
	// })();
})(ServerConfig.db, ServerConfig.appName);

export default databaseAdapter;