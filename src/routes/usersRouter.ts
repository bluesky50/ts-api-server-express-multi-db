import express from 'express';
// import * as UsersController from '../controllers/usersController';
// import * as UsersController from '../controllers/mockUsersController';
import UsersControllerAdapter from '../controllers/adapters/usersControllerAdapter';

function usersRouter(dbType: string) {
	const router: any = express.Router();
	const UsersController: any = UsersControllerAdapter(dbType);

	router.get('/', UsersController.getObjects);
	router.get('/:username', UsersController.getObject);
	router.post('/', UsersController.createObject);
	router.put('/:username', UsersController.updateObject);
	router.delete('/:username', UsersController.deleteObject);
	
	return router;
}

export default usersRouter;