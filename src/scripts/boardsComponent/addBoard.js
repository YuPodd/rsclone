import ElementsCreator from '../utils/elementsCreator';
import { backgroundImages } from '../constants/boardBackgrounds';


export class AddBoard {
    constructor(mainContainer) {
        this.backgroundImages = backgroundImages;
        this.createBoardCommand;
        this.newBoardData = {name: '', background: ''};
        this.popupContent = this.createPopupContent(mainContainer);
    }

    createPopupContent(mainContainer) {
        const popupContent = ElementsCreator.createElement('div', 'popup_content hidden', mainContainer);
        const inputContainer = ElementsCreator.createElement('div', 'input_container', popupContent);
        const input = ElementsCreator.createElement('input', 'board-name_input', inputContainer);
        input.placeholder = 'Enter board name';
        this.createBoardCommand = ElementsCreator.createElement('button', 'create-board_button', inputContainer);
        this.createBoardCommand.innerText = 'Create Board';
        const backgroundsContainer = ElementsCreator.createElement('div', 'backgrounds_container', popupContent);
        const exit = ElementsCreator.createElement('div', 'exit_container', popupContent);
        ElementsCreator.createElement('span', 'exit_button', exit); 
        this.backgroundImages.push(null);
        const backgroundsCollection = [];
        for(let i = 0; i < this.backgroundImages.length; i ++) {
            const box = ElementsCreator.createElement('button', 'background-picture', backgroundsContainer);
            backgroundsCollection.push(box);
            box.style.backgroundImage = `url(${this.backgroundImages[i]})`;
        }
        this.addPopupListeners(inputContainer, backgroundsContainer, input, backgroundsCollection);
        return popupContent;
    }

    openPopup() {
        this.menu.className = 'boards-menu_content hidden';
        this.popup.className = 'popup_content visibly';
    }

    addPopupListeners(inputContainer, backgroundsContainer, input, backgroundsCollection) {
        inputContainer.onclick = function() {event.stopPropagation()};
        backgroundsContainer.onclick = function() {event.stopPropagation()};
        const newBoardData = this.newBoardData;
        input.addEventListener('keyup', function() {
            newBoardData.name = this.value;
        })
        backgroundsCollection.forEach(element => {
            element.addEventListener('click', function() {
                inputContainer.style.backgroundImage = this.style.backgroundImage;
                newBoardData.background = this.style.backgroundImage;
            })
        })
    }
}