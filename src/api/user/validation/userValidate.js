import {response} from "../../../response/response.js";
import expressValidator from "express-validator";

const check = expressValidator.check;
const validationResult = expressValidator.validationResult;

export const validateNewUser = [
    check('username')
    .exists()
    .isLength({min:3})
    .withMessage('Username must be at least 3 characters long'),
    check('password')
    .exists()
    .isLength({min:8})
    .withMessage('Password must be at least 8 characters long'),
    check('email')
    .exists()
    .isEmail()
    .withMessage('Email must be a valid email address'),
    check('role')
    .exists()
    .custom((value,{req})=>{
        if(value !== 'admin' && value !== 'basic'){
            throw new Error('Role must be admin or basic');
        }
        return true;
    }),
    (req,res,next)=>{
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            console.log(error);
            return response.error(req,res,error,500);
        }
    }
]
















/*
export const validateNewUser=(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return response.error(req,res,"Please fill all the fields",400);
        }
        if(!username.trim() || !email.trim() || !password.trim()){
            return response.error(req,res,"Please fill all the fields",400);
        }
        if(username.length < 5){
            return response.error(req,res,"Name should be atleast 3 characters",400);
        }
        if(password.length<8){
            return response.error(req,res,"Password should be atleast 8 characters",400);
        }
        if(!email.includes("@") || !email.includes(".")){
            return response.error(req,res,"Please enter a valid email",400);
        }
        next();
        
    } catch (error) {
        console.log(error)
        return response.error(req,res,error.message,500)
    }
}*/