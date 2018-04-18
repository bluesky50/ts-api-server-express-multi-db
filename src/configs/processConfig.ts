import ServerConfig from './config';

const env = process.env.NODE_ENV || ServerConfig.env;

const ProcessConfig = {
	PORT: ServerConfig.port,
	DB_URI: ServerConfig.dbUri,
	HASH_SECRET: 'abc123'
}

if (env === 'test' || env === 'dev') {
	Object.keys(ProcessConfig).forEach((k) => {
		process.env[k] = ProcessConfig[k];
	});
}