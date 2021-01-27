import ElementsCreator from '../utils/elementsCreator';
import LocalStorage from '../utils/localStorage';
import board from '../../assets/ico/board.svg';
import { AddBoard } from './addBoard';


export class BoardsMenu {
    constructor() {
        this.navbarButton = document.querySelector('.navbar-boards');
        this.menuContent;
        this.existingBoardsData = LocalStorage.getData('existingBoards');
        this.existingBoardsMenuLinks = [];
        this.addBoard;
        this.createMenuList();
        this.htmlElements;
        this.addNewBoardCommand;
    }

    createMenuList() {
        const navbarButtonIco = ElementsCreator.createElement('img', 'navbar-boards_ico', this.navbarButton);
        navbarButtonIco.src = board;
        const navbarButtonInnerText = ElementsCreator.createElement('p', 'navbar-boards_button-name', this.navbarButton);
        navbarButtonInnerText.innerText = 'Boards';
        const mainContainer = document.querySelector('.boards-menu_container');
        this.menuContent = ElementsCreator.createElement('div', 'boards-menu_content visible', mainContainer);
        const addBoardCommand = ElementsCreator.createElement('button', 'add-board_button', this.menuContent);
        addBoardCommand.innerText = 'Add new board';
        const wrapperThis = this;
        if (this.existingBoardsData !== null) {
            this.existingBoardsData.forEach(element => {
                wrapperThis.crateBoardMenuLink(wrapperThis.menuContent, element);
            });
        }
        this.addBoard = new AddBoard(mainContainer);
        this.htmlElements = {wrapper: mainContainer, menu: this.menuContent, popup: this.addBoard.popupContent};
        this.addBoardsListeners(mainContainer, addBoardCommand);
        this.addNewBoardCommand = this.addBoard.createBoardCommand;
    }

    crateBoardMenuLink(parent, board) {
        const boardLink = ElementsCreator.createElement('button', 'boards-menu_board-link', parent);
        boardLink.id = board.name;
        boardLink.style.backgroundImage = board.background;
        this.existingBoardsMenuLinks.push(boardLink);
        const backgroundIco = ElementsCreator.createElement('div', 'background-ico', boardLink);
        backgroundIco.style.backgroundImage = board.background;
        const linkName = ElementsCreator.createElement('span', 'boards-menu_board-name', boardLink);
        linkName.innerText = board.name;
    }

    addBoardsListeners(mainContainer, addBoardCommand) {
        this.navbarButton.onclick = this.changeMenuListCondition.bind(this.htmlElements);
        mainContainer.onclick = this.changeMenuListCondition.bind(this.htmlElements);
        this.menuContent.onclick = function() {
            event.stopPropagation()
        };
        addBoardCommand.onclick = this.addBoard.openPopup.bind(this.htmlElements);
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
