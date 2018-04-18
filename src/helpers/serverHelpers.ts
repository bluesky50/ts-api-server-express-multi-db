import debug from 'debug';

debug('ts-api-server:server');

// Normalize a port into a number, string, or false.
export function normalizePort(val: number|string): number|string|boolean {
	const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
	if (isNaN(port)) { return val; } else if (port >= 0) { return port; } else { return false; }
}

// Event listener for HTTP server "error" event.
export function onError(port: any) {
	return function(error: NodeJS.ErrnoException): void {
		if (error.syscall !== 'listen') { throw error; }
		const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
	
	  // handle specific listen errors with friendly messages
		switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
		}
	}
}

export function onListening(server: any) {
	return () => {
		const addr = server.address();
		const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
		debug(`Listening on ${bind}`);
	};
}