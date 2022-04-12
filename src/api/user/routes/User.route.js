export class UserRoute{
    constructor(express,controller,response,validateNewUser){
        this._router = express.Router();
        this._ctrl = controller;
        this._response = response;
        this._validate = validateNewUser;
        this.registerRoutes()
    }

    registerRoutes(){
        this._router.post('/signup',this._validate,this.handleSignUp.bind(this));
        this._router.get('/',this.handleGetAllUsers.bind(this));
    }

    async handleSignUp(req,res){
        let message= `${req.body.username} has been registered`;
       this._response.success(req,res,message,200);
        /*
        try {
          let user = req.body;
          let result = await this._ctrl.createNewUser(user);
          if(result){
            let message = `User ${result._username} created successfully`;
            this._response.success(req,res,message);
          }else{
            this._response.error(req,res,new Error('Error saving user'));
          } 
        } catch (error) {
            console.log(error);
            this._response.error(req,res,error); 
        }*/
    }

    async handleGetAllUsers(req,res){
        try {
            let allUsers = await this._ctrl.getAllUsers();
            this._response.success(req,res,allUsers,200);
        } catch (error) {
            console.log(error);
            this._response.error(req,res,error,500); 
        }
    }
    

}