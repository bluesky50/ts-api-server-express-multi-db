import { IConfig } from '../interfaces/config';

const Config: IConfig = {
	appName: 'ts-api-server',
	port: 3000,
	host: '0.0.0.0',
	db: 'ne', // can be 'postgres', 'ne', 'sqlite', 'mongo'
	dbUri: "",
	env: 'dev'
}

export default Config;