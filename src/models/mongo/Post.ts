import { Schema, model, Model, Document } from 'mongoose';

interface IPost {
	title: string,
	content: string,
	author: Schema.Types.ObjectId,
}
interface IPostModel extends IPost, Document {}
interface IPostModelStatic extends Model<IPostModel> {}

const PostSchema: Schema = new Schema({
	title: {
		type: String,
		default: '',
		required: true,
	},
	content: {
		type: String,
		required: true,
		default: '',
	},
	author: {
		type: Schema.Types.ObjectId,
		default: null,
		ref: 'User'
	}
});

const Post = model<IPostModel, IPostModelStatic>('Post', PostSchema);

export default Post;