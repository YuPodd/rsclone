import ElementCreator from '../utils/elementsCreator';

export class ModalWindow {
    constructor() {
        this.container = document.querySelector('.modal_container.hidden');
        this.message;
        this.createWindow();
    }

    createWindow() {
        const content = ElementCreator.createElement('div', 'modal_content', this.container);
        this.message = ElementCreator.createElement('p', 'modal-message', content);
        const acceptCommand = ElementCreator.createElement('button', 'modal-accept_button', content);
        acceptCommand.innerText = 'accept';
        acceptCommand.onclick = this.hiddenWindow.bind(this.container);
    }

    showWindow(modalWindowMessage) {
        this.message.innerText = modalWindowMessage;
        this.container.className = 'modal_container visibly';
    }

    hiddenWindow() {
        this.className = 'modal_container hidden';
    }
}