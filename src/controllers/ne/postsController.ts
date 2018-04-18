import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

import db from '../../dbAdapters/adapter';

const posts = db.getDb().posts; 

class NePostsController implements IController {
	getObjects(req: Request, res: Response): void {
		posts.find({}, function(err, docs) {
			if (err) {
				handleServerError(res, err);
				return;
			}
			const status = res.statusCode;
			res.json({ status, data: docs});
		});
	}
	
	getObject(req: Request, res: Response): void {
		const title: string = req.params.title;
	
		if (validateStringInput(title)) {
			posts.find({ title }, function(err, docs) {
				if (err) {
					handleServerError(res, err);
					return;
				}
				const status = res.statusCode;
				res.json({ status, data: docs });
			});
		} else {
			handleInvalidInput(res);
		}
	}
	
	createObject(req: Request, res: Response): void {
		const { title, content, author } = req.body;
	
		if(testAll(validateStringInput, title, content, author)) {
			posts.insert({ title, content, author }, function(err, newDoc) {
				if (err) {
					handleServerError(res, err);
					return;
				}
				const status = res.statusCode;
				res.json({ status, data: newDoc });
			});
		} else {
			handleInvalidInput(res);
		}
	}
	
	updateObject(req: Request, res: Response): void {
		const t = req.params.title;
		const { author, title, content } = req.body;
	
		if(testAll(validateStringInput, t, author, title, content)) {
			posts.update({ title: t }, {name, title, content}, {}, function(err, numUpdated) {
				if (err) {
					handleServerError(res, err);
					return;
				}
				const status = res.statusCode;
				res.json({ status, data: numUpdated });
			});
		} else {
			handleInvalidInput(res);
		}
	}
	
	deleteObject(req: Request, res: Response): void {
		const { title } = req.params;
	
		if(validateStringInput(title)) {
			posts.remove({ title }, {}, function(err, numRemoved) {
				if (err) {
					handleServerError(res, err);
					return;
				}
				const status = res.statusCode;
				res.json({ status, data: numRemoved });
			});
		} else {
			handleInvalidInput(res);
		}
	}
}

export default NePostsController;