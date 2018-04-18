import MongoPostsController from '../mongo/postsController';
import SqlitePostsController from '../sqlite/postsController';
import NePostsController from '../ne/postsController';
import DefaultPostsController from '../default/mockPostsController';

function postsControllerAdapter(dbType: string) {
	switch(dbType) {
		case 'mongo':
			return new MongoPostsController();
		case 'ne':
			return new NePostsController();
		case 'postgres':
			return;
		case 'sqlite':
			return new SqlitePostsController();
		default:
			return new DefaultPostsController();
	}
}

export default postsControllerAdapter;