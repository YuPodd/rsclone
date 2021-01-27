import { BoardsMenu } from './boardsComponent/boardsMenu';
import { Desktop } from './desktopComponent/desktop';

export class AppComponent {
    constructor() {
        this.setEventsListeners();
    }

    setEventsListeners() {
        const boards = new BoardsMenu();
        const desktop = new Desktop();
        boards.existingBoardsMenuLinks.forEach(element => {
            element.addEventListener('click', function () {
                boards.changeMenuListCondition.call(boards.htmlElements);
                desktop.showDesktop({name: this.id, background: this.style.backgroundImage})
            })
        });
        boards.addNewBoardCommand.addEventListener('click', function (){
            let desktopData = boards.addBoard.saveNewBoard()
            if (desktopData === null) {
                return;
            }
            boards.changeMenuListCondition.call(boards.htmlElements);
            boards.crateBoardMenuLink(boards.menuContent, desktopData);
            desktop.showDesktop(desktopData);
        })
    }
}