interface IDBAdapter {
	readonly DB_URI: string;
	connect(): void;
	getDb(): any;
}