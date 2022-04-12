export class UserController{
    constructor(model,entity,utils){
        this._entity = entity;
        this._model =  model;
        this._utils = utils;
    }
    async createNewUser(user){
        if(user){
           let newUser = new this._entity(user);
           newUser.encryptPassword(user.password,this._utils);
           let res= await this._model.save(newUser);
           return res;
        }else{
           return false;
        }

    }

    async getAllUsers(){
        try {
            let allUser = await this._model.all();
            return allUser;
        } catch (error) {
            console.log(error)
            return false
        }
    }
}