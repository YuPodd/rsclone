import { BoardsMenu } from './boardsComponent/boardsMenu';
import LocalStorage from './utils/localStorage';

export class AppComponent {
    constructor() {
        this.setEventsListeners();
    }

    setEventsListeners() {
        const boards = new BoardsMenu();
        let addNewBoardCommand = boards.addNewBoardCommand;
        addNewBoardCommand.addEventListener('click', function (){
            if (boards.dataOfNewBoard.name == "") {
                alert('Enter the board name');
            } else {
               boards.changeMenuListCondition.call(boards.htmlElements); 
               LocalStorage.setData('Boards', boards.dataOfNewBoard);
            }
            console.log(boards.dataOfNewBoard); // data for creating new User board
        })
    }
}