import { ModalWindow } from './modalWindowComponent/modalWindow';
import { BoardsMenu } from './boardsComponent/boardsMenu';
import { Desktop } from './desktopComponent/desktop';
import Server from './utils/server';

export class AppComponent {
    constructor() {
        this.setEventsListeners();
    }

    setEventsListeners() {
        const modalWindow = new ModalWindow();
        const boards = new BoardsMenu();
        const desktop = new Desktop(modalWindow);
        boards.existingBoardsMenuLinks.forEach(element => {
            element.addEventListener('click', function () {
                //Server.get();
                boards.changeMenuListCondition.call(boards.htmlElements);
                desktop.showDesktop(desktop.getBoardData(this.id));
            })
        });
        boards.addNewBoardCommand.addEventListener('click', function() {
            let desktopData = boards.addBoard.saveNewBoard();
            if (desktopData === null) {
                modalWindow.showWindow('Enter the board name')
                return;
            }
            let json = JSON.stringify(desktopData);
            //Server.post(json);
            window.location.reload();
        })
    }
}