import { ModalWindow } from './modalWindowComponent/modalWindow';
import { BoardsMenu } from './boardsComponent/boardsMenu';
import { Desktop } from './desktopComponent/desktop';
import Server from './utils/server';
import DayNightMode from "./dayNightMode/dayNightMode";
import LocalStorage from './utils/localStorage';

export class AppComponent {
    constructor() {
        this.startApp();
    }

    startApp() {
        this.setEventsListeners();
        
    }

    setEventsListeners() {
        const modalWindow = new ModalWindow();
        const desktop = new Desktop(modalWindow);
        if (desktop.activeBoard !== null) {
            Server.getBoard(desktop);
        }
        const boards = new BoardsMenu();
        boards.existingBoardsMenuLinks.forEach(element => {
            element.addEventListener('click', function () {
                boards.changeMenuListCondition.call(boards.htmlElements);
                Server.getBoard(desktop);
            })
        });
        boards.addNewBoardCommand.addEventListener('click', function() {
            let newBoardData = boards.addBoard.saveNewBoard();
            if (newBoardData === null) {
                modalWindow.showWindow('Enter the board name')
                return;
            }
            boards.changeMenuListCondition.bind(boards.htmlElements)();
            desktop.desktopData = newBoardData;
            Server.postBoard(desktop);
            window.location.reload();
        })
        modalWindow.acceptCommand.addEventListener('click', function() {
            if (modalWindow.input.className = 'modal_input visibly' && modalWindow.input.value === '') {
                return;
            } 
            if (modalWindow.message.innerText === 'Enter member name') {
                Server.getUser(modalWindow.input.value, desktop, modalWindow);
            } else if (modalWindow.message.innerText === 'Pleace, enter your name') {
                LocalStorage.setObjectData('AppUser', {name: modalWindow.input.value});
                Server.postNewUser(modalWindow.input.value);
            }
            modalWindow.input.className = 'modal_input hidden'
            modalWindow.hiddenWindow.bind(modalWindow.container)();
        });
    }
}
