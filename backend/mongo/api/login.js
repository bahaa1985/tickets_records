import { userModel,privilegseModel } from "../models.js";
import bcrypt from 'bcrypt';

// export async function getUsers(){
//     const users = userModel();
//     const allUsers = users.find();
//     return allUsers;
// }

export async function getUser(userName, password){
    const users = userModel();
    // Find user by username only
    const user = await users.findOne({userName: userName});
    
    // If user not found or password is missing, return null
    if (!user || !user.password) {
        return null;
    }
    
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Return the user if password matches, otherwise return null
    return isMatch ? user : null;
}