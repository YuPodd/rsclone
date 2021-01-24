import ElementsCreator from '../utils/elementsCreator';
import board from '../../assets/ico/board.svg';
import { AddBoard } from './addBoard';


export class BoardsMenu {
    constructor() {
        this.navbarButton = document.querySelector('.navbar-boards');
        this.createMenuList();
        this.htmlElements;
        this.addNewBoardCommand;
        this.dataOfNewBoard;
    }

    createMenuList() {
        const navbarButtonIco = ElementsCreator.createElement('img', 'navbar-boards_ico', this.navbarButton);
        navbarButtonIco.src = board;
        const navbarButtonInnerText = ElementsCreator.createElement('p', 'navbar-boards_button-name', this.navbarButton);
        navbarButtonInnerText.innerText = 'Boards';
        const mainContainer = document.querySelector('.boards-menu_container');
        const menuContent = ElementsCreator.createElement('div', 'boards-menu_content visible', mainContainer);
        const addBoardCommand = ElementsCreator.createElement('button', 'add-board', menuContent);
        addBoardCommand.innerText = 'Add new board';
        const addBoard = new AddBoard(mainContainer);
        this.htmlElements = {wrapper: mainContainer, menu: menuContent, popup: addBoard.popupContent};
        this.addBoardsListeners(mainContainer, menuContent, addBoardCommand, addBoard);
        this.addNewBoardCommand = addBoard.createBoardCommand;
        this.dataOfNewBoard = addBoard.newBoardData;
    }

    addBoardsListeners(mainContainer, menuContent, addBoardCommand, addBoard) {
        this.navbarButton.onclick = this.changeMenuListCondition.bind(this.htmlElements);
        mainContainer.onclick = this.changeMenuListCondition.bind(this.htmlElements);
        menuContent.onclick = function() {
            event.stopPropagation()
        };
        addBoardCommand.onclick = addBoard.openPopup.bind(this.htmlElements);
    }

    changeMenuListCondition() {
        if (this.wrapper.className == 'boards-menu_container hidden') {
            this.wrapper.className = 'boards-menu_container visible';
        } else {
            this.wrapper.className = 'boards-menu_container hidden';
            this.menu.className = 'boards-menu_content visible';
            this.popup.className = 'popup_content hidden';
        }
    }
}
