import mongoose, { Schema } from 'mongoose';

const CommentSchema: Schema = new Schema({
    _id: { type: String },
    text: { type: String },
    author_id: { type: Schema.Types.String, ref: 'User' },
    post_id: { type: Schema.Types.String, ref: 'Post' },
    created_at: { type: String }
}, { _id: false });

export default mongoose.model('Comment', CommentSchema);