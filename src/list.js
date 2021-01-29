//функция создания блока с определенными тегами и классами

/*function createBlock(tag,className){
    const block = document.createElement(tag);
    if(className){
        block.classList.add(className);
    }
    return block;
}*/

import createBlock from './exportFunctions'

let enableDisable = 1;

function createList() {
    const list = createBlock("div", "list");
    const list__header = createBlock("div", "list__header")
    const list__title = createBlock("h4", "list__title");
    list__title.innerHTML = "List";
    list__title.contentEditable = "false";
    list__title.addEventListener('click', function(e){
        editSaveTitleList(e);
    });
    list__title.addEventListener("keypress", function(e){
        if(e.keyCode === 13){
            e.target.parentNode.querySelector('.list__title').contentEditable = false;
            enableDisable = 1;
        }
    });
    const list__header__button__delete = createBlock("button", "list__header__button__delete");
    list__header__button__delete.addEventListener('click', function(e) {
        deleteList(e);
    });
    const list__content = createBlock("div", "list__content");
    const button_createItem = createBlock("button", "button_createItem");
    button_createItem.addEventListener('click', function(e) {
        outputItem(e);
    });
    list.appendChild(list__header);
    list.appendChild(list__content);
    list__header.appendChild(list__title);
    list__header.appendChild(list__header__button__delete);
    list__content.appendChild(button_createItem);
    return list;
}

//функция создания одного item и его возврата
function createItem() {
    const item = createBlock("div", "item");
    const item__text = createBlock("p", "item__text");
    item__text.addEventListener('click', function(e) {
        editSaveTextItem(e);
    });
    item__text.addEventListener("keypress", function(e){
        if(e.keyCode === 13){
            e.target.parentNode.querySelector('.item__text').contentEditable = false;
            enableDisable = 1;
        }
    });
    const item__button__open = createBlock("button", "item__button__open");
    item__button__open.addEventListener('click', function(e) {
        openPopup(e);
    });
    const item__button__delete =createBlock("button", "item__button__delete")
    item__button__delete.addEventListener('click', function(e) {
        deleteItem(e);
    });
    item__text.innerHTML = "Item";
    item.appendChild(item__button__delete);
    item.appendChild(item__text);
    item.appendChild(item__button__open);
    return item;
}

//функция вывода листа на страницу
const outputList = function() {
    const list = createList();
    const menu__container = createPopup();
    document.querySelector(".container").appendChild(list);
}

//функция вывода item на лист
const outputItem = function (e) {
    const item = createItem();
    //const menu__container = createPopup();
    e.target.parentNode.appendChild(item);
    //e.target.parentNode.appendChild(menu__container);
}

//редактирование и сохранение изменения заголовка листа
const editSaveTitleList = function(e) {
    const list = e.target.parentNode.querySelector('.list__title');
    if (enableDisable === 1) {
        enableDisable = 0;
		list.contentEditable = true;
        list.focus();
	}
	else {
        enableDisable = 1;
        list.contentEditable = false
    }
}

//редактирование и сохранение измениния заголовка листа

const editSaveTextItem = function(e) {
    const item = e.target.parentNode.querySelector('.item__text');
    if (enableDisable === 1) {
        enableDisable = 0;
		item.contentEditable = true;
        item.focus();
	}
	else {
        enableDisable = 1;
        item.contentEditable = false
    }
}

//функция удаления одного листа
const deleteList = function(e){
    const list__header = e.target.parentNode.parentNode;
    list__header.remove();
}

const deleteItem = function(e) {
    const item = e.target.parentNode;
    item.remove();
}

//создание popup
function createPopup(){
    const menu__container = createBlock("div", "menu-container");
    //hidden++;
    //menu__container.classList.add(`hidden${hidden}`);
    const menu = createBlock("div", "menu");
    const menu__container__title = createBlock("div", "menu-container__title");
    const menu__title = createBlock("h4", "menu__title");
    menu__title.innerHTML = "Item";
    const menu__container__button__closePopup = createBlock("button", "menu-container__button-closePopup");
    menu__container__button__closePopup.addEventListener('click', function(){
        closePopup();
    });
    const menu__container__description = createBlock("div", "menu-container__description");
    const menu__description = createBlock("p", "menu__description");
    /*menu__description.addEventListener('click', function(){
        addDescription();
    });*/
    menu__description.innerHTML = "Add a description ...";
    menu__description.addEventListener('click', function(e){
        editSaveTextDescription(e);
    });
    menu__description.addEventListener("keypress", function(e){
        if(e.keyCode === 13){
            e.target.parentNode.querySelector('.menu__description').contentEditable = false;
            enableDisable = 1;
        }
    });
    /*const menu__container__comments = createBlock("div", "menu__container__comments");
    const menu__input = createBlock("input", "menu__input");
    const menu__button = createBlock("button", "menu__button");
    const menu__comments = createBlock("div", "menu__comments");
    const comment = createBlock("div", "comment");*/
    menu__container.appendChild(menu);
    menu.appendChild(menu__container__title);
    menu__container__title.appendChild(menu__title);
    menu__container__title.appendChild(menu__container__button__closePopup);
    menu.appendChild(menu__container__description);
    menu__container__description.appendChild(menu__description);
    /*menu.appendChild(menu__container__description);
    menu.appendChild(menu__container__comments);
    menu__container__title.appendChild(menu__title);
    menu__container__description.appendChild(menu__description);
    menu__container__comments.appendChild(menu__input);
    menu__container__comments.appendChild(menu__button);
    menu__container__comments.appendChild(menu__comments);
    menu__comments.appendChild(comment);*/
    return menu__container;
}

function openPopup(e) {
    const menu__container = document.querySelector(".menu-container");
    menu__container.style.display = "flex";
    const title = e.target.parentNode.querySelector('.item__text').innerHTML;
    document.querySelector('.menu__title').innerHTML = title;
}

function closePopup(){
    const menu__container = document.querySelector(".menu-container");
    menu__container.style.display = "none";
}

/*function createEnteringDescription(){
    const menu__container__description = document.querySelector('.menu-container__description')
    const editDescription = createBlock("textarea", "menu-container__description__textarea");
    const saveDescription__button = createBlock("button", "menu-container__description__button");
    menu__container__description.appendChild(editDescription);
    return menu__container__description;
}*/

function addDescription(){
    document.querySelector('.menu__description').style.display = "none";
    //createEnteringDescription();
}

const editSaveTextDescription = function(e) {
    const description = e.target.parentNode.querySelector('.menu__description');
    if (enableDisable === 1) {
        enableDisable = 0;
		description.contentEditable = true;
        description.focus();
	}
	else {
        enableDisable = 1;
        description.contentEditable = false
    }
}

document.querySelector('.button-createList').addEventListener('click', outputList);

const menu__container = createPopup();
document.querySelector(".container").appendChild(menu__container);
