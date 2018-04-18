import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

import db from '../../dbAdapters/adapter';
import User from '../../models/sqlite/UserSequelize';
const sequelize = db.getDb(); 

class SqliteUsersController implements IController {
	getObjects(req: Request, res: Response): void {
		User.findAll()
			.then((data) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err) => {
				handleServerError(res, err);
			});
	}
	
	getObject(req: Request, res: Response): void {
		const username: string = req.params.username;
	
		if (validateStringInput(username)) {
			User.findOne({ username })
				.then((data) => {
					const status = res.statusCode;
					res.json({ status, data });
				})
				.catch((err) => {
					handleServerError(res, err);
				});
		} else {
			handleInvalidInput(res);
		}
	}
	
	createObject(req: Request, res: Response): void {
		const { name, username, email, password } = req.body;
	
		if(testAll(validateStringInput, name, username, email, password)) {
			User.sync({force: true})
				.then(() => {
					return User.create({
						name,
						username,
						email
					});
				})
				.then((data) => {
					const status = res.statusCode;
					res.json({ status, data });
				})
				.catch((err) => {
					handleServerError(res, err);
				});
		} else {
			handleInvalidInput(res);
		}
	}
	
	// Not implemented yet
	updateObject(req: Request, res: Response): void {
		const u = req.params.username;
		const { name, username } = req.body;
	
		if(testAll(validateStringInput, u, name, username)) {
			const status = res.statusCode;
			res.json({ status, data: 'not implemented' });
		} else {
			handleInvalidInput(res);
		}
	}
	
	// Not implemented yet
	deleteObject(req: Request, res: Response): void {
		const { username } = req.params;
	
		if(validateStringInput(username)) {
			const status = res.statusCode;
			res.json({ status, data: 'not implemented' });
		} else {
			handleInvalidInput(res);
		}
	}
}

export default SqliteUsersController;