import ElementsCreator from '../utils/elementsCreator';
import LocalStorage from '../utils/localStorage';
import { HTML_BODY } from '../constants/htmlElements';
import { EMPTY_IMAGE } from '../constants/boardBackgrounds';

export class Desktop {
    constructor(modalWindow) {
        this.boardName;
        this.membersConainer;
        this.createDesktop(modalWindow);
    }

    createDesktop(modalWindow) {
        const mainContainer = document.querySelector('.desktop_container');
        const headerContent = ElementsCreator.createElement('div', 'header_content', mainContainer);
        this.boardName = ElementsCreator.createElement('h2', 'board-name', headerContent);
        this.membersConainer = ElementsCreator.createElement('div', 'members_container', headerContent);
        const desktopContent = ElementsCreator.createElement('div', 'desktop_content', mainContainer);
        const appUser = LocalStorage.getData('AppUser');
        if (appUser === null) {
            modalWindow.showWindow('Pleace, enter your name', true);
        }
        const desktopData = LocalStorage.getData('ActiveBoard');
        if (desktopData === null) {
            this.showDesktop({name: 'There are no boards here yet', background: EMPTY_IMAGE}, true);
        } else {
            this.showDesktop(desktopData);
        }
    }

    createMembersIco(members) {
        members.forEach(element => {
            const member = ElementsCreator.createElement('div', 'member_ico', this.membersConainer);
            member.innerText = element;
        });
        const addMemberButton = ElementsCreator.createElement('button', 'add-member_button', this.membersConainer);
        addMemberButton.innerText = '+';
    }

    showDesktop(desktopData, defaultData = false) {
        HTML_BODY.style.backgroundImage = desktopData.background;
        this.boardName.innerText = desktopData.name;
        if (!defaultData) {
            this.createMembersIco(desktopData.members);
        }
    }
}