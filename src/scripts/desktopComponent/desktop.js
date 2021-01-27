import ElementsCreator from '../utils/elementsCreator';
import LocalStorage from '../utils/localStorage';

export class Desktop {
    constructor() {
        this.body = document.querySelector('.body');
        this.boardName;
        this.createDesktop();
    }

    createDesktop() {
        const mainContainer = document.querySelector('.desktop_container');
        const desktopContent = ElementsCreator.createElement('div', 'desktop_content', mainContainer);
        const desktopData = LocalStorage.getData('ActiveBoard');
        this.boardName = ElementsCreator.createElement('h2', 'board-name', desktopContent);
        if (desktopData === null) {
            return;
        }
        this.boardName.innerText = desktopData.name;
        this.body.style.backgroundImage = desktopData.background;
    }

    showDesktop(desktopData) {
        this.body.style.backgroundImage = desktopData.background;
        this.boardName.innerText = desktopData.name;
        LocalStorage.setObjectData('ActiveBoard', desktopData);
    }
}