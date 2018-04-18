import express from 'express';
import UsersRouter from '../routes/usersRouter';
import PostsRouter from '../routes/postsRouter';

function buildRoutes(app: express.Application, dbType: string): void {
	const indexRouter: express.Router = express.Router();

	app.use('/', indexRouter);
	app.use('/users', UsersRouter(dbType));
	app.use('/posts', PostsRouter(dbType));
}

export default buildRoutes;