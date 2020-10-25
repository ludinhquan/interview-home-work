import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    _id: { type: Schema.Types.String },
    title: { type: Schema.Types.String },
    content: { type: Schema.Types.String },
    tags: { type: Schema.Types.Array },
    author_id: { type: Schema.Types.String, ref: 'User' },
    created_at: { type: Schema.Types.String },
    comments: [{ type: Schema.Types.String, ref: 'Comment' }]
}, { _id: false });

export default mongoose.model('Post', UserSchema);