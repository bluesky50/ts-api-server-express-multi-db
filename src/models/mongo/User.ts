import bcrypt from 'bcrypt';
import validator from 'validator';

import { Schema, Document, model, Model } from 'mongoose';

interface IUser {
	name: string,
	username: string,
	email: string,
	password: string
}
interface IUserModel extends IUser, Document {}
interface IUserModelStatic extends Model<IUserModel> {}

const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 6
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minLength: 1,
		unique: true,
		// Typescript doesn't like how validate is typed, works in javascript
		// validate: {
		// 	isAsync: true,
		// 	validator: validator.isEmail,
		// 	message: '${VALUE} is not a valid email'
		// },
	},
	password: {
		type: String,
		requied: true,
		minLength: 6
	}
});

UserSchema.statics.findByCredentials = function (email, password) {
	const User = this;

	return User.findOne({
		email
	}).then((user) => {
		if (!user) {
			return Promise.reject(1);
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user);
				} else {
					reject();
				}
			});
		});
	}).catch((err) => {
		console.log('Error in processing credentials.');
		throw new Error("Error in User model static method: " + err.message);
	});
}

UserSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();
	return {
		_id: userObject._id,
		name: userObject.name,
		username: userObject.username,
		email: userObject.email
	};
}

UserSchema.pre('save', function(next) {
	const user: any = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = model<IUserModel, IUserModelStatic>('User', UserSchema);

export default User;