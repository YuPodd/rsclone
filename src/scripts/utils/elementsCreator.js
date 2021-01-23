export default class ElementsCreator {
    static createElement(type, className, parent) {
        let element = document.createElement(type);
        element.className = className;
        parent.append(element);
        return element;
    }
}

