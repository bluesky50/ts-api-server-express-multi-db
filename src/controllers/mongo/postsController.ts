import { Request, Response, NextFunction } from 'express';
import { validateStringInput, testAll } from '../../helpers/validators';
import { handleInvalidInput, handleServerError } from '../../helpers/handlers';

import Post from '../../models/mongo/Post';

class MongoPostsController implements IController {
	getObjects(req: Request, res: Response): void {
		Post.find({})
			.then((data: any) => {
				const status = res.statusCode;
				res.json({ status, data });
			})
			.catch((err: any) => {
				handleServerError(res, err);
			});
	}
	
	getObject(req: Request, res: Response): void {
		const title: string = req.params.title;
	
		if (validateStringInput(title)) {
			Post.findOne({ title })
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
		const { name, Postname, email, password } = req.body;
	
		if(testAll(validateStringInput, name, Postname, email, password)) {
			const newPost = new Post({
				name,
				Postname,
				email,
				password
			});
		
			newPost.save()
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
		const t = req.params.title;
		const { author, title, content } = req.body;
	
		if(testAll(validateStringInput, name, title, content)) {
			Post.findOneAndUpdate({ title: t }, { content })
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
		const { title } = req.params;
	
		if(validateStringInput(title)) {
			Post.findOneAndRemove({ title })
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

export default MongoPostsController;