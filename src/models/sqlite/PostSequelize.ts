import Sequelize from 'sequelize';
import db from '../../dbAdapters/adapter';
import ServerConfig from '../../configs/config';

function SqlPostModel () {
	if (ServerConfig.db === 'sqlite') {
		const sequelize = db.getDb();

		const Post = sequelize.define('post', {
			title: {
				type: Sequelize.STRING
			},
			content: {
				type: Sequelize.STRING
			},
			author: {
				type: Sequelize.STRING
			}
		});

		return Post;
	}
}

export default SqlPostModel();