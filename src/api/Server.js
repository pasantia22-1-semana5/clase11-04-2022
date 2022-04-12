//librerias
import express from "express";
import cors from "cors";
import morgan from "morgan";
import {fileURLToPath} from "url";
import {dirname,join} from "path";
//modulos
import {userModule} from "./user/index.js";
import {authModule} from "./auth/index.js";
import {auth} from "./auth/middleware/auth.js";
//documentacion
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


/**
 * @class Server
 * @description Clase que contiene la configuracion del servidor
 * @since 2022-04-10
 * @version 1.0.0
 * @param {object} config configuraciones del servidor
 */
export class Server{
    constructor(config){
        this._api = express();
        this._port = config.api.port;
        this._name = config.api.name;
        this._hostName= config.api.hostname;
        this._rootUrl= '/api/v1';
        this._pathPublic = '../public';
        this._dirname = dirname(fileURLToPath(import.meta.url));
        this._swaggerJsDocs = YAML.load(join(dirname(fileURLToPath(import.meta.url)),"../docs/docs.yaml"));
        this.setMiddlewares();
        this.setRoutes();
    }

    setMiddlewares(){
        this._api.use(express.json());
        this._api.use(express.urlencoded({extended: false}));
        this._api.use(cors());
        this._api.use(morgan('dev'));
        this._api.use(express.static(join(this._dirname,this._pathPublic)));
    }
   

    setRoutes(){
        this._api.use('/api/v1/auth',authModule());
        this._api.use('/api/v1/users',userModule());
        this._api.use('/api/v1/docs',swaggerUi.serve,swaggerUi.setup(this._swaggerJsDocs));
    }


    start(){
        try {
          this._api.set('trust proxy', this._hostName);
          this._api.listen(this._port,()=>{
              console.log(`Server of ${this._name} running at http://${this._hostName}:${this._port}`)
          }) 
        } catch (error) {
            console.log(error);
        }
    }

}