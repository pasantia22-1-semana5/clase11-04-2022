import { Server } from "./Server.js";
import { config } from "../config/default.js";

function main(config){
    const server = new Server(config);
    server.start();
}

main(config);