export class AuthController{
    constructor(model,entity,utils){
        this._utils = utils;
        this._entity = entity;
        this._model = model;
    }

    async createAuthUser(pass,user){
        let result = await this._utils.comparePassword(pass,user._password);
        if(result){
            let tok = await this._utils.generateToken(user._id);
            return new this._entity(true,user._id,user._username,tok,user._role);
        }    
    }

    async signIn(user){
        let{username,email,password}=user;
        if(username){
            try {
                let data = await this._model.findUserByUsername(username);
                return await this.createAuthUser(password,data);
            } catch (error) {
                return new this._entity(false,null,null,null,null);
            }
        }else if(email){
            try {
                let dataEmail = await this._model.findUserByEmail(email);
                return this.createAuthUser(password,dataEmail);
            } catch (error) {
                return new this._entity(false,null,null,null,null);
            }
        }else{
            return false;
        }
    }
}