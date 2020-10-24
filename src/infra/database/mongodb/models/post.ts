import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    _id: { type: String },
    title: { type: String },
    content: { type: String },
    tags: { type: String },
    ownerId: { type: Schema.Types.String, ref: 'User' },
    createdAt: { type: String }
}, { _id: false });

export default mongoose.model('Post', UserSchema);