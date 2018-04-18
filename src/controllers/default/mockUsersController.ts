import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

let storage: any = [];

class DefaultUsersController implements IController {
	getObjects(req: Request, res: Response): void {
		const status = res.statusCode;
		res.json({ status, data: storage });
	}
	
	getObject(req: Request, res: Response): void {
		const username: string = req.params.username;
	
		if (validateStringInput(username)) {
			const user = storage.filter((u: any) => {
				if (u.username === username) {
					return true;
				}
				return false;
			});
			const status = res.statusCode;
			res.json({ status, data: user });
		} else {
			handleInvalidInput(res);
		}
	}
	
	createObject(req: Request, res: Response): void {
		const { name, username, email, password } = req.body;
	
		if(testAll(validateStringInput, name, username, email, password)) {
			const newUser = {
				name,
				username,
				email,
				password
			};
		
			storage.push(newUser);
			const status = res.statusCode;
			res.json({ status, data: newUser });
		} else {
			handleInvalidInput(res);
		}
	}
	
	updateObject(req: Request, res: Response): void {
		const { name, username } = req.body;
	
		if(testAll(validateStringInput, name, username)) {
			let user = '';
			for (let i = 0; i < storage.length; i++) {
				if (storage[i].username = username) {
					storage[i].name = name;
					user = storage[i];
					break;
				}
			
			}
			const status = res.statusCode;
			res.json({ status, data: user });
		} else {
			handleInvalidInput(res);
		}
	}
	
	deleteObject(req: Request, res: Response): void {
		const { username } = req.params;
	
		if(validateStringInput(username)) {
			let user = '';
			storage = storage.filter((u: any) => {
				if (u.username !== username) {
					return true;
				}
				user = u;
				return false;
			});
			
			const status = res.statusCode;
			res.json({ status, data: user });
		
		} else {
			handleInvalidInput(res);
		}
	}
}

export default DefaultUsersController;