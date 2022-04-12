import dotenv from "dotenv";

const env = dotenv.config();
export const  config = {
    api:{
        port: process.env.PORT || 4000,
        name: process.env.NAME || 'api-School',
        hostname: process.env.HOSTNAME || '127.0.0.1'
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'secret!'
    },
}