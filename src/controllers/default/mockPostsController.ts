import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

let storage: any = [];

class DefaultPostsController implements IController {
	getObjects(req: Request, res: Response): void {
		const status = res.statusCode;
		res.json({ status, data: storage });
	}
	
	getObject(req: Request, res: Response): void {
		const title: string = req.params.title;
	
		if (validateStringInput(title)) {
			const post = storage.filter((t: any) => {
				if (t.title === title) {
					return true;
				}
				return false;
			});
			const status = res.statusCode;
			res.json({ status, data: post });
		} else {
			handleInvalidInput(res);
		}
	}
	
	createObject(req: Request, res: Response): void {
		const { title, content, author } = req.body;
	
		if(testAll(validateStringInput, title, content, author)) {
			const newPost = {
				title,
				content,
				author
			};
		
			storage.push(newPost);
			const status = res.statusCode;
			res.json({ status, data: newPost });
		} else {
			handleInvalidInput(res);
		}
	}
	
	updateObject(req: Request, res: Response): void {
		const { title, content, author } = req.body;
	
		if(testAll(validateStringInput, title, content, author)) {
			let post = '';
			for (let i = 0; i < storage.length; i++) {
				if (storage[i].title = title && storage[i].author === author) {
					storage[i].content = content;
					post = storage[i];
					break;
				}
			
			}
			const status = res.statusCode;
			res.json({ status, data: post });
		} else {
			handleInvalidInput(res);
		}
	}
	
	deleteObject(req: Request, res: Response): void {
		const { title } = req.params;
	
		if(testAll(validateStringInput, title)) {
			let post = '';
			storage = storage.filter((p: any) => {
				if (p.title !== title) {
					return true;
				}
				post = p;
				return false;
			});
			
			const status = res.statusCode;
			res.json({ status, data: post });
		
		} else {
			handleInvalidInput(res);
		}
	}
}

export default DefaultPostsController;