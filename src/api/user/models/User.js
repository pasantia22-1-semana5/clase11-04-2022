export class User{
    constructor(user){
      //  this._id = 0;
        this._username= user.username;
        this._email= user.email;
        this._password= user.password;
        this._role= user.role;
      //  this._createdAt= this.getDateNow();
    }

    getDateNow(){
        let time = Date.now();
        let date = new Date(time);
        return date.toDateString();
    }

    encryptPassword(password,utils){
        this._password = utils.encrypt(password);
    }
}
