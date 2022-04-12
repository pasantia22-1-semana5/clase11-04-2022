import express from "express";
import {response} from "../../response/response.js";
import {User} from "./models/User.js";
import {UserController} from "./controller/User.ctrl.js";
import {FileJsonModel} from "./models/Model.js";
import {UserRoute} from "./routes/User.route.js";
import {utils} from "../../libs/utils.js";
import {validateNewUser} from "./validation/userValidate.js";



export const userModule=()=>{
    const model = new FileJsonModel(User);
    const controller = new UserController(model,User,utils);
    const router = new UserRoute(express,controller,response,validateNewUser)._router;
    return router;
}