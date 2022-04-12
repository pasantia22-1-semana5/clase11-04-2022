export class AuthUserRoute{
    constructor(express,controller,response){
        this._router= express.Router();
        this._ctrl = controller;
        this._response = response;
        this.registerRoutes();
    }
    registerRoutes(){
        this._router.post('/signin',this.handleSignIn.bind(this));
    }

    async handleSignIn(req,res){
        let user = req.body;
        if(user){
            let result = await this._ctrl.signIn(user);
            if(result.auth){
                this._response.success(req,res,result,200);
            }else{
                this._response.error(req,res,result,401);
            }
        }
    }



}