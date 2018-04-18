import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

import db from '../../dbAdapters/adapter';
import Post from '../../models/sqlite/PostSequelize';
const sequelize = db.getDb(); 

class SqlitePostsController implements IController {
	getObjects(req: Request, res: Response): void {
		Post.findAll()
			.then((data) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err) => {
				handleServerError(res, err);
			});
	}
	
	getObject(req: Request, res: Response): void {
		const title: string = req.params.title;
	
		if (validateStringInput(title)) {
			Post.findOne({ title })
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
		const { title, content, author } = req.body;
	
		if(testAll(validateStringInput, title, content, author)) {
			Post.sync({force: false})
			.then(() => {
				return Post.create({
					title,
					content,
					author
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
	
	// Not implemented
	updateObject(req: Request, res: Response): void {
		const t = req.params.title;
		const { author, title, content } = req.body;
	
		if(testAll(validateStringInput, t, author, title, content)) {
			const status = res.statusCode;
			res.json({ status, data: 'not implemented' });
		} else {
			handleInvalidInput(res);
		}
	}
	
	// Not implemented
	deleteObject(req: Request, res: Response): void {
		const { title } = req.params;
	
		if(validateStringInput(title)) {
			const status = res.statusCode;
			res.json({ status, data: 'not implemented' });
		} else {
			handleInvalidInput(res);
		}
	}
}

export default SqlitePostsController;