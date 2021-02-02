import { SERVER } from '../constants/server';

export default class Server {

    static post(data) {
        SERVER.open("POST", "http://localhost:4200/", true);
        SERVER.send(data);
    }

    static get() {
        SERVER.open("GET", "http://localhost:4200/", true);
        SERVER.send();
        SERVER.onload = function() {
            console.log(this.responseText);
        }
        
    }
}