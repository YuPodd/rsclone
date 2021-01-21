import ElementsCreator from './elementsCreator';

export class AddBoard {
    constructor(mainContainer) {
        this.pictures = ['https://eco-business.imgix.net/ebmedia/fileuploads/Feature_RightsofNature_inline2.jpg?fit=crop&h=801&ixlib=django-1.2.0&q=85&w=1200', 'https://www.unwater.org/app/uploads/2020/03/71016.jpg', 'https://miro.medium.com/max/3200/1*L7A7S-hvSqs7lfaynI08AQ.jpeg', 'https://i.pinimg.com/originals/45/92/f5/4592f5e85f6a93b057120203f49094b4.jpg'];
        this.createBoardButton;
        this.newBoardData = {name: '', background: ''};
        this.popupContent = this.createPopupContent(mainContainer);
    }

    createPopupContent(mainContainer) {
        const popupContent = ElementsCreator.createElement('div', 'popup_content hidden', mainContainer);
        const inputContainer = ElementsCreator.createElement('div', 'input_container', popupContent);
        const input = ElementsCreator.createElement('input', 'board-name_input', inputContainer);
        input.placeholder = 'Enter board name';
        this.createBoardButton = ElementsCreator.createElement('button', 'create-board_button', inputContainer);
        this.createBoardButton.innerText = 'Create Board';
        const backgroundsContainer = ElementsCreator.createElement('div', 'backgrounds_container', popupContent);
        const exit = ElementsCreator.createElement('div', 'exit_container', popupContent);
        ElementsCreator.createElement('span', 'exit_button', exit); 
        const backgroundsCollection = [];
        for(let i = 0; i < this.pictures.length; i ++) {
            const box = ElementsCreator.createElement('button', 'background-picture', backgroundsContainer);
            box.style.backgroundImage = `url(${this.pictures[i]})`;
            backgroundsCollection.push(box);
        }
        this.createPopupListeners(inputContainer, backgroundsContainer, input, backgroundsCollection);
        return popupContent;
    }

    openPopup() {
        this.menu.className = 'boards-menu_content hidden';
        this.popup.className = 'popup_content visibly';
    }

    createPopupListeners(inputContainer, backgroundsContainer, input, backgroundsCollection) {
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