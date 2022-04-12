export class AuthUser{
    constructor(auth,id,username,token,role){
        this.auth=auth,
        this.id= id,
        this.username=username,
        this.token=token,
        this.rol= role,	
        this.message= auth?'Login success':'Login failed'
    }
}