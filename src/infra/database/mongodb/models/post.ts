import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    title: { type: String },
    content: { type: String },
    tags: { type: String },
    ownerId: { type: String },
    created_at: { type: String }
});

export default mongoose.model('Post', UserSchema);