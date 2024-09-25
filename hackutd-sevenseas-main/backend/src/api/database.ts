import mongoose, { Model, Schema, Document } from 'mongoose';
export const api = mongoose;
export interface UserDataModel extends Document {
    username: string;
    password: string;
    scripts?: ScriptData[];
}
export interface UserData {
    username: string;
    password: string;
    scripts?: ScriptData[];
}
export interface ScriptData {
    name: string;
    description: string;
    code: string;
    log: string;
}
export interface UserDataUpdatable {
    password?: string;
    scripts?: ScriptData[];
}
export const UserModel: Model<UserDataModel> = mongoose.model('userdata', new Schema({
    username: String,
    password: String,
    scripts: [Object]
}));
export async function connect(): Promise<void> {
    mongoose.connect('mongodb+srv://LordOssas:rKWynLFw26g73Bu@cluster0.l59ro.mongodb.net/hackutd?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
}
export async function disconnect(): Promise<void> {
    mongoose.disconnect();
}
export async function registerUser(data: UserData): Promise<boolean> {
    const user = await getUser(data.username);
    if (user) {
        return false;
    }
    const newUser = new UserModel(data);
    await newUser.save();
    return true;
}
export async function updateUser(username: string, data: UserDataUpdatable): Promise<boolean> {
    const user = await getUser(username);
    if (!user) {
        return false;
    }
    if (data.password) {
        user.password = data.password;
    }
    if (data.scripts) {
        user.scripts = data.scripts;
    }
    await user.save();
    return true;
}
export async function getUser(username: string) {
    return await UserModel.findOne({ username: username });
}