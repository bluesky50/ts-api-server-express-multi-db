import express from 'express';
import PostsControllerAdapter from '../controllers/adapters/postsControllerAdapter';

function postsRouter(dbType: string) {
	const router = express.Router();
	const PostsController: any = PostsControllerAdapter(dbType);
	
	router.get('/', PostsController.getObjects);
	router.get('/:title', PostsController.getObject);
	router.post('/', PostsController.createObject);
	router.put('/:title', PostsController.updateObject);
	router.delete('/:title', PostsController.deleteObject);

	return router;
}

export default postsRouter;