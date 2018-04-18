import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

import User from '../../models/mongo/User';

class MongoUsersController implements IController {
	getObjects(req: Request, res: Response): void {
		User.find({})
			.then((data: any) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err: any) => {
				handleServerError(res, err);
			});
	}
	
	getObject(req: Request, res: Response): void {
		const username: string = req.params.username;
	
		if (validateStringInput(username)) {
			User.findOne({ username })
			.then((data: any) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err: any) => {
				handleServerError(res, err);
			});
		} else {
			handleInvalidInput(res);
		}
	}
	
	createObject(req: Request, res: Response): void {
		const { name, username, email, password } = req.body;
	
		if(testAll(validateStringInput, name, username, email, password)) {
			const newUser = new User({
				name,
				username,
				email,
				password
			});
		
			newUser.save()
			.then((data: any) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err: any) => {
				handleServerError(res, err);
			});
		} else {
			handleInvalidInput(res);
		}
	}
	
	updateObject(req: Request, res: Response): void {
		const u = req.params.username;
		const { name, username } = req.body;
	
		if(testAll(validateStringInput, u, name, username)) {
			User.findOneAndUpdate({ username: u }, { name, username })
			.then((data: any) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err: any) => {
				handleServerError(res, err);
			});
		} else {
			handleInvalidInput(res);
		}
	}
	
	deleteObject(req: Request, res: Response): void {
		const { username } = req.params;
	
		if(validateStringInput(username)) {
			User.findOneAndRemove({ username })
			.then((data: any) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err: any) => {
				handleServerError(res, err);
			});
		} else {
			handleInvalidInput(res);
		}
	}
}

export default MongoUsersController;