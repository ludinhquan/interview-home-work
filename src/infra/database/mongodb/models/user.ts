import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    _id: { type: String },
    username: { type: String },
    password: { type: String },
    name: { type: String },
    dob: { type: String },
    created_at: { type: String }
}, { _id: false });

export default mongoose.model('User', UserSchema);