
import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

import db from '../../dbAdapters/adapter';

const users = db.getDb().users; 

class NeUsersController implements IController {
	getObjects(req: Request, res: Response): void {
		users.find({}, function(err, docs) {
			if (err) {
				handleServerError(res, err);
				return;
			}
			const status = res.statusCode;
			res.json({ status, data: docs });
		});
	}
	
	getObject(req: Request, res: Response): void {
		const username: string = req.params.username;
	
		if (validateStringInput(username)) {
			users.find({ username }, function(err, docs) {
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
		const { name, username, email, password } = req.body;
	
		if(testAll(validateStringInput, name, username, email, password)) {
			users.insert({ name, username, email }, function(err, newDoc) {
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
		const uname = req.params.username; 
		const { name, username } = req.body;
	
		if(testAll(validateStringInput, uname, name, username)) {
			users.update({ username: uname }, { name, username }, {}, function(err, numReplaced) {
				if (err) {
					handleServerError(res, err);
					return;
				}
				const status = res.statusCode;
				res.json({ status, data: numReplaced });
			});
		} else {
			handleInvalidInput(res);
		}
	}
	
	deleteObject(req: Request, res: Response): void {
		const { username } = req.params;
	
		if(validateStringInput(username)) {
			users.remove({ username }, {}, function (err, numRemoved) {
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

export default NeUsersController;