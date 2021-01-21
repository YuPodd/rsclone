import ElementsCreator from './elementsCreator';
import {AddBoard} from './addBoard';

export class BoardsMenu {
    constructor() {
        this.navbarButton = document.querySelector('.navbar-boards');
        this.createMenuList();
        this.htmlElements = {};
    }

    createMenuList() {
        const mainContainer = document.querySelector('.boards-menu_container');
        const menuContent = ElementsCreator.createElement('div', 'boards-menu_content visible', mainContainer);
        const addBoardButton = ElementsCreator.createElement('button', 'add-board', menuContent);
        addBoardButton.innerText = 'Add new board';
        const addBoard = new AddBoard(mainContainer);
        this.htmlElements = {wrapper: mainContainer, menu: menuContent, popup: addBoard.popupContent};
        this.createBoardsListeners(mainContainer, menuContent, addBoardButton, addBoard);
    }

    createBoardsListeners(mainContainer, menuContent, addBoardButton, addBoard) {
        this.navbarButton.onclick = this.changeMenuListCondition.bind(this.htmlElements);
        mainContainer.onclick = this.changeMenuListCondition.bind(this.htmlElements);;
        menuContent.onclick = function() {
            event.stopPropagation()
        };
        addBoardButton.onclick = addBoard.openPopup.bind(this.htmlElements);
        addBoard.createBoardButton.onclick = this.setNewBoard.bind(addBoard.newBoardData);
    }

    setNewBoard() {
        
    }

    changeMenuListCondition() {
        if (this.wrapper.className == 'boards-menu_container hidden') {
            this.wrapper.className = 'boards-menu_container visible';
        } else {
            this.wrapper.className = 'boards-menu_container hidden';
            this.menu.className = 'boards-menu_content visible';
            this.popup.className = 'boards-menu_content hidden';
        }
    }
}
