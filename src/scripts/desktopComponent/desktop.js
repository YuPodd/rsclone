import ElementsCreator from '../utils/elementsCreator';
import LocalStorage from '../utils/localStorage';
import Server from '../utils/server';
import { HTML_BODY } from '../constants/htmlElements';
import { EMPTY_IMAGE } from '../constants/boardBackgrounds';

export class Desktop {
    constructor(modalWindow) {
        this.activeBoard = LocalStorage.getData('ActiveBoard');
        this.boardName;
        this.membersContent;
        this.addMemberButton;
        this.desktopData = {};
        this.createDesktop(modalWindow);
    }

    createDesktop(modalWindow) {
        const mainContainer = document.querySelector('.desktop_container');
        const headerContent = ElementsCreator.createElement('div', 'header_content', mainContainer);
        this.boardName = ElementsCreator.createElement('h2', 'board-name', headerContent);
        const membersConainer = ElementsCreator.createElement('div', 'members_container', headerContent);
        this.membersContent = ElementsCreator.createElement('div', 'members_content', membersConainer);
        const desktopContent = ElementsCreator.createElement('div', 'desktop_content', mainContainer);
        const appUser = LocalStorage.getData('AppUser');
        this.addMemberButton = ElementsCreator.createElement('button', 'add-member_button hidden', membersConainer);
        this.addMemberButton.innerText = '+';
        this.addMemberButton.addEventListener('click', function() {
        modalWindow.showWindow('Enter member name', true);
        })
        if (appUser === null) {
            modalWindow.showWindow('Pleace, enter your name', true);
        }
        if (this.activeBoard === null) {
            HTML_BODY.style.backgroundImage = EMPTY_IMAGE;
            this.boardName.innerText = 'There are no boards here yet';
            return;
        }
        //this.showDesktop();        
    }

    createMembersIco(members) {
        this.membersContent.innerHTML = '';
        members.forEach(element => {
            const member = ElementsCreator.createElement('div', 'member_ico', this.membersContent);
            member.innerText = element;
        });
    }

    showDesktop() {
        HTML_BODY.style.backgroundImage = this.desktopData.background;
        this.boardName.innerText = this.desktopData.name;
        this.createMembersIco(this.desktopData.members);
        if (this.desktopData !== null) {
            this.addMemberButton.className = 'add-member_button visibly';
        } else {
            this.addMemberButton.className = 'add-member_button hidden';
        }
        LocalStorage.setObjectData('ActiveBoard', {name: this.desktopData.name});
    }

    /*getBoardData(boardName) {
        let allBoardsData = LocalStorage.getData('existingBoards');
        let boardData;
        allBoardsData.forEach((board) => {
            if(board.name === boardName) {
                boardData = board;
            }
        })
        return boardData;
    }*/
}