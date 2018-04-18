import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';
// import createError from 'http-errors';

import db from './dbAdapters/adapter';
import buildRoutes from './helpers/buildRoutes';
import { normalizePort, onError, onListening } from './helpers/serverHelpers';

import ServerConfig from './configs/config';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
	}

	public run(): void {
		this._pre();
		this._start();
		this._post();
	}

	private _pre(): void {
		this._configure();
		this._init();
	}

	private _start(): void {

		// Initialize port
		const port = normalizePort(process.env.PORT || ServerConfig.port);
		this.app.set('port', port);

		// Create HTTP server.
		const server = http.createServer(this.app);

		// Listen on provided port, on all network interfaces.
		server.listen(port, () => {
			console.log(`Server listening on port ${port}...`);
		});
		server.on('error', onError(port));
		server.on('listening', onListening(server));
	}

	private _post(): void {
		
	}
	
	private _configure(): void {
		const port = normalizePort(process.env.PORT || ServerConfig.port);

		this.app.set('port', ServerConfig.port);
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(logger('dev'));
		this.app.use(helmet());
		this.app.use(cors());

		// cors
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
			res.header('Access-Control-Allow-Credentials', 'true');
			next();
		});

		// catch 404 and forward to error handler
		// this.app.use(function(req, res, next) {
		// 	next(createError(404));
		// });
		
		// error handler
		// this.app.use(function(err, req, res, next) {
		// 	// set locals, only providing error in development
		// 	res.locals.message = err.message;
		// 	res.locals.error = req.app.get('env') === 'development' ? err : {};
		
		// 	// render the error page
		// 	res.status(err.status || 500);
		// 	res.render('error');
		// });
	}

	private _init(): void {
		// Connect to database
		db.connect();

		// Setup Routes
		buildRoutes(this.app, ServerConfig.db);
	}
}

export default Server;