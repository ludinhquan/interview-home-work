import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    username: { type: String },
    password: { type: String },
    name: { type: String },
    dob: { type: String },
    created_at: { type: String }
});

export default mongoose.model('User', UserSchema);