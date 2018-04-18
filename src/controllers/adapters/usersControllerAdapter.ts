import MongoUsersController from '../mongo/usersController';
import SqliteUsersController from '../sqlite/usersController';
import NeUsersController from '../ne/usersController';
import DefaultUsersController from '../default/mockUsersController';

function usersControllerAdapter(dbType: string) {
	switch(dbType) {
		case 'mongo':
			return new MongoUsersController();
		case 'ne':
			return new NeUsersController();
		case 'postgres':
			return;
		case 'sqlite':
			return new SqliteUsersController();
		default:
			return new DefaultUsersController();
	}
}

export default usersControllerAdapter;