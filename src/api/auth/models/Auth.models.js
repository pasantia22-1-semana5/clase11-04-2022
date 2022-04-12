import fs from 'fs';

export class JsonFileModel{
    constructor(){
        this._dataPath = './src/db/UserData.json';
    }

    readJsonFile(){
        let fileContents = fs.readFileSync(this._dataPath, 'utf8');
        if(fileContents){
            return JSON.parse(fileContents);
        }
        return [];
    }

    writeJsonFile(data){
        try{
            let jsonData = JSON.stringify(data,null,'');
            fs.writeFileSync(this._dataPath, jsonData);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    findUserByUsername(username){
        return new Promise((resolve,reject)=>{
            let data = this.readJsonFile();
            let user = data.find(user => user._username === username);
            if(user){
                resolve(user);
            }else{
                reject(new Error('User not found'));
            }
        });
    }

    findUserByEmail(email){
        return new Promise((resolve,reject)=>{
            let data = this.readJsonFile();
            let user = data.find(user => user._email === email);
            if(user){
                resolve(user);
            }else{
                reject(new Error('User not found'));
            }
        });
    }

    findById(id){
        return new Promise((resolve,reject)=>{
            let data = this.readJsonFile();
            let result = data.find(user => user._id === parseInt(id));
            if(result){
                resolve(result);
            }else{
                reject(new Error('User not found'));
            }
        });
    }

    update(id,user){
        user.id = parseInt(id);
        newUser.id = parseInt(id);
        let data = this.readJsonFile();
        let updateItems = data.map(item => {
            if(item.id == parseInt(id)){
                return item = user;
            }
            return item;
            }
        );
        this.writeJsonFile(updateItems);
    }


}