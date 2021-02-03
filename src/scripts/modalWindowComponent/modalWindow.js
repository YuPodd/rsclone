import ElementCreator from '../utils/elementsCreator';
import LocalStorage from '../utils/localStorage';

export class ModalWindow {
    constructor() {
        this.container = document.querySelector('.modal_container.hidden');
        this.message;
        this.input;
        this.acceptCommand;
        this.createWindow();
    }

    createWindow() {
        const content = ElementCreator.createElement('div', 'modal_content', this.container);
        this.message = ElementCreator.createElement('p', 'modal-message', content);
        this.input = ElementCreator.createElement('input', 'modal_input hidden', content);
        this.acceptCommand = ElementCreator.createElement('button', 'modal-accept_button', content);
        this.acceptCommand.innerText = 'accept';
    }

    showWindow(modalWindowMessage, showInputElement = false) {
        this.message.innerText = modalWindowMessage;
        this.container.className = 'modal_container visibly';
        if (showInputElement) {
            this.input.className = 'modal_input visibly';
        } /*else {
            this.acceptCommand.onclick = this.hiddenWindow.bind(this.container);
        }*/
    }

    hiddenWindow() {
        this.className = 'modal_container hidden';
    }
}