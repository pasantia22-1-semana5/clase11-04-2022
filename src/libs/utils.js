import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from "../config/default.js"

export const utils={
    encrypt:function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
    comparePassword:function(password,hash){
        return bcrypt.compareSync(password, hash);
    },
    generateToken: async (id) => {
        console.log("id:",id)
        return await jwt.sign({ id: id }, config.jwt.secret, { expiresIn: 86400 });
    },
    verifyToken: async (token) => {
        return await jwt.verify(token, config.jwt.secret);
    }
}