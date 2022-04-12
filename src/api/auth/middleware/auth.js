import {response} from "../../../response/response.js"
import {utils} from "../../../libs/utils.js";
import {JsonFileModel} from "../models/Auth.models.js";

const model = new JsonFileModel();

export const auth ={
    verifyToken: async (req,res,next)=>{
        let token = req.headers['authorization']||req.query.token;
        if(!token){

            return response.error(req,res,"required token",401);
        }else{
            let result = await utils.verifyToken(token)
            console.log(result);
            if(result){
                req.user = result;
                console.log("authenticated");
                next();
            }
        }
    },

    isAdmin: async (req,res,next)=>{
        let id = req.user.id;
        let data = await model.findById(id);
        if(data._role==="admin"){
            next();
        }else{
            return response.error(req,res,"you are not admin",401);
        }
    },
    isModerador: async (req,res,next)=>{
        let id = req.user.id;
        let data = await model.findById(id);
        if(data._role==="moderator"){
            next();
        }else{
            return response.error(req,res,"you are not moderator",401);
        }
    },
    isBasic: async (req,res,next)=>{
        let id = req.user.id;
        let data = await model.findById(id);
        if(data._role==="basic"){
            next();
        }else{
            return response.error(req,res,"you are not basic",401);
        }
    }
}