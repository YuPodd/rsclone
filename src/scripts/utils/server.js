import { SERVER } from '../constants/server';
import LocalStorage from './localStorage';

export default class Server {

    static postNewUser(name) {
        SERVER.open("POST", "http://localhost:4200/newUser", true);
        SERVER.send(name);
    }

    static getUser(userName, desktop,  modalWindow) {
        console.log(desktop.desktopData)
        SERVER.open("GET", `http://localhost:4200/user/${userName}&${desktop.desktopData.name}&${desktop.desktopData.background}`, true);
        SERVER.send();
        SERVER.onload = function() {
            if (this.responseText === 'true') {
                desktop.desktopData.members.push(userName);
                desktop.showDesktop();
                Server.postBoard(desktop);
            } else {
                modalWindow.showWindow("This user not exist");
            }
        }
    }

    static postBoard(desktop) {
        console.log(desktop.desktopData);
        SERVER.open("POST", `http://localhost:4200/updateBoard/${desktop.desktopData.name}`, true);
        SERVER.send(JSON.stringify(desktop.desktopData));
        desktop.showDesktop();
    }

    static getBoard(desktop) {
        SERVER.open("GET", `http://localhost:4200/board/${desktop.activeBoard.name}`, true);
        SERVER.send();
        SERVER.onload = function() {
            desktop.desktopData = JSON.parse(this.responseText);
            console.log(desktop.desktopData)
            desktop.showDesktop();
        }
    }

    /*static getBoardsRef(app) {
        console.log(app)
        let user = LocalStorage.getData('AppUser');
        SERVER.open("GET", `http://localhost:4200/boardsRef/${user.name}`, true);
        SERVER.send();
        SERVER.onload = function() {
            app(JSON.parse(this.responseText));
            console.log(this.responseText);
        }
    }*/
}