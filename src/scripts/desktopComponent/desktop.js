import ElementsCreator from '../utils/elementsCreator';
import LocalStorage from '../utils/localStorage';
import { HTML_BODY } from '../constants/htmlElements';
import { EMPTY_IMAGE } from '../constants/boardBackgrounds';

export class Desktop {
    constructor() {
        this.boardName;
        this.createDesktop();
    }

    createDesktop() {
        const mainContainer = document.querySelector('.desktop_container');
        const desktopContent = ElementsCreator.createElement('div', 'desktop_content', mainContainer);
        const desktopData = LocalStorage.getData('ActiveBoard');
        this.boardName = ElementsCreator.createElement('h2', 'board-name', desktopContent);
        if (desktopData === null) {
            HTML_BODY.style.backgroundImage = EMPTY_IMAGE;
            return;
        }
        this.boardName.innerText = desktopData.name;
        HTML_BODY.style.backgroundImage = desktopData.background;
    }

    showDesktop(desktopData) {
        HTML_BODY.style.backgroundImage = desktopData.background;
        this.boardName.innerText = desktopData.name;
        LocalStorage.setObjectData('ActiveBoard', desktopData);
    }
}