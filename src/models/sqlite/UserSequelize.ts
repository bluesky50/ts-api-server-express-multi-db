import Sequelize from 'sequelize';
import db from '../../dbAdapters/adapter';
import ServerConfig from '../../configs/config';

function SqlUserModel () {
	if (ServerConfig.db === 'sqlite') {
		const sequelize = db.getDb();

		const User = sequelize.define('user', {
			name: {
				type: Sequelize.STRING
			},
			username: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			}
		});
	
		return User;
	}
}


export default SqlUserModel();