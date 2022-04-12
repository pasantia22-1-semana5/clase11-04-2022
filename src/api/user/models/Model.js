import fs from 'fs';
export class FileJsonModel{
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

    generateId(){
        let data = this.readJsonFile();
        let lastItem = data.pop();
        if(lastItem){
            return ++lastItem._id;
        }
        return 1;
    }

    save(item){
        return new Promise((resolve,reject)=>{
            let data = this.readJsonFile();
            item._id = this.generateId();
            data.push(item);
            let res = this.writeJsonFile(data);
            if(res){
                resolve(item);
            }else{
                reject(new Error('Error saving item'));
            }
        })
    }

    all(){
        return new Promise((resolve,reject)=>{
            resolve(this.readJsonFile());
        });
    }

    findById(id){
        let data = this.readJsonFile();
        return data.find(item => item._id == parseInt(id));
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