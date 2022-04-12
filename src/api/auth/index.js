import express from "express";
import {response} from "../../response/response.js";
import {AuthUser} from "./models/AuthUser.js";
import {JsonFileModel} from "./models/Auth.models.js";
import {AuthController} from "./controller/Auth.ctrl.js";
import {AuthUserRoute} from "./routes/Auth.route.js";
import {utils} from "../../libs/utils.js";


export const authModule=()=>{
    const model = new JsonFileModel();
    const controller = new AuthController(model,AuthUser,utils);
    const route = new AuthUserRoute(express,controller,response)._router;
    return route;
}