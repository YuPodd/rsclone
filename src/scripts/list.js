import createBlock from './exportFunctions'
import Sortable from 'sortablejs';

let enableDisable = 1; // включение/отключение редактирования текстовой информации
let id = 0; // количество item на html странице
let numberButtonOpenPopup; //номер нажатой кнопки, которая открывает всплывающее окно item
let numberComment = 0; // номер комментария
const objectItem = []; // массив объектов, в котором хранятся данные каждого item:
                       // имя item, описание item, комментарии item

// функция создания листа
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
            const item = e.target.parentNode.querySelector('.item__text');
            item.contentEditable = false;
            enableDisable = 1;
            objectItem.forEach(function(element){
                if(element.id === e.target.nextSibling.value){
                    element.name = item.innerHTML;//localStorage
                }
            });
        }
    });
    const item__button__open = createBlock("button", "item__button__open");
    item__button__open.value = id;
    item__button__open.addEventListener('click', function(e) {
        numberButtonOpenPopup = e.target.value;
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
    objectItem[id] = {
        id: `${id}`,
        name: `${item__text.innerHTML}`,
        description: 'Add a description ...',
        comment: [],
    };
    console.log(objectItem);
    id++;
    return item;
}

//функция вывода листа на страницу
const outputList = function() {
    const list = createList();
    document.querySelector(".container").appendChild(list);
}

//функция вывода item на лист
const outputItem = function (e) {
    const item = createItem();
    e.target.parentNode.appendChild(item);

    //add drag'n'drop functionality
    let items = document.getElementsByClassName('list__content');
    for (let elem of items) {
      Sortable.create(elem, {
          animation: 500,
          group: {
            name: "shared",
            put: true,
            pull: true,
          },
          sort: true
        });  
  }
}

//редактирование и сохранение измененного заголовка листа
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

//редактирование и сохранение измененного заголовка листа
const editSaveTextItem = function(e) {
    const item = e.target.parentNode.querySelector('.item__text');
    if (enableDisable === 1) {
        enableDisable = 0;
		item.contentEditable = true;
        item.focus();
	}
	else {
        enableDisable = 1;
        item.contentEditable = false;
        objectItem.forEach(function(element){
            if(element.id === e.target.nextSibling.value){
                element.name = item.innerHTML;//localStorage
            }
        });
    }
}

//функция удаления одного листа
const deleteList = function(e){
    const list__header = e.target.parentNode.parentNode;
    list__header.remove();
}

//функция удаления одного item
const deleteItem = function(e) {
    const item = e.target.parentNode;
    item.remove();
}

//создание всплывающего окна
function createPopup(){
    const menu__container = createBlock("div", "menu-container");
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
    menu__description.innerHTML = "Add a description ...";
    menu__description.addEventListener('click', function(e){
        editSaveTextDescription(e);
    });
    menu__description.addEventListener("keypress", function(e){
        if(e.keyCode === 13){
            const description = e.target.parentNode.querySelector('.menu__description');
            description.contentEditable = false;
            enableDisable = 1;
            objectItem.forEach(function(element){
                if(element.id === numberButtonOpenPopup){
                    element.description = description.innerHTML;//localStorage
                }
            });
        }
    });
    const menu__container__comments = createBlock("div", "menu__container__comments");
    const menu__input = createBlock("input", "menu__input");
    menu__input.placeholder = "Write a comment";
    const menu__button = createBlock("button", "menu__button");
    menu__button.innerHTML = "Add";
    menu__button.addEventListener('click', function(){
        const comment = createBlock("p", "comment");
        document.querySelector('.menu__comments').appendChild(comment);
        let input_taker = input();
        document.querySelectorAll('.comment')[numberComment].innerHTML = input_taker;
        objectItem.forEach(function(element){
            if(element.id === numberButtonOpenPopup){
                element.comment[numberComment] = input_taker;//localStorage
            }
        });
        numberComment++;
        document.querySelector('.menu__input').value = '';
    });
    const menu__comments = createBlock("div", "menu__comments");
    menu__container.appendChild(menu);
    menu.appendChild(menu__container__title);
    menu__container__title.appendChild(menu__title);
    menu__container__title.appendChild(menu__container__button__closePopup);
    menu.appendChild(menu__container__description);
    menu__container__description.appendChild(menu__description);
    menu.appendChild(menu__container__comments);
    menu__container__comments.appendChild(menu__input);
    menu__container__comments.appendChild(menu__button);
    menu__container__comments.appendChild(menu__comments);
    return menu__container;
}

// функция открытия popup. По умолчанию он скрыт
function openPopup(e) {
    const buttonOpen = e.target.value;
    let nameItem;
    let descriptionItem;
    let commentsItem = [];
    objectItem.forEach( function(element){
        if(buttonOpen === element.id){
            nameItem = element.name;//localStorage
            descriptionItem = element.description;//localStorage
            commentsItem = element.comment.slice();
        }
    });
    const menu__container = document.querySelector(".menu-container");
    menu__container.style.display = "flex";
    document.querySelector('.menu__title').innerHTML = nameItem;
    document.querySelector('.menu__description').innerHTML = descriptionItem;
    commentsItem.forEach(function(element){
        numberComment++;
        const comment = createBlock("p", "comment");
        comment.innerHTML = element;//localStorage
        document.querySelector('.menu__comments').appendChild(comment);
    });
}

//Закрытие всплывающего окна
function closePopup(){
    const menu__container = document.querySelector(".menu-container");
    menu__container.style.display = "none";
    numberComment = 0;
    document.querySelector('.menu__comments').remove();
    const menu__comments = createBlock("div", "menu__comments");
    document.querySelector('.menu__container__comments').appendChild(menu__comments);
}

//Редактирование и сохранение описания item
const editSaveTextDescription = function(e) {
    const description = e.target.parentNode.querySelector('.menu__description');
    if (enableDisable === 1) {
        enableDisable = 0;
		description.contentEditable = true;
        description.focus();
	}
	else {
        enableDisable = 1;
        description.contentEditable = false;
        objectItem.forEach(function(element){
            if(element.id === numberButtonOpenPopup){
                element.description = description.innerHTML;//localStorage
            }
        });
    }
}

//функция возврата значения, которое пользователь вводит в input для того, чтобы оставить комментарий
function input() {
    let input_taker = document.querySelector('.menu__input').value;
    return input_taker;
  }

//Добавление нового листа на страницу
document.querySelector('.button-createList').addEventListener('click', outputList);

// div, в котором содержится всплывающее окно, становится дочерним элементом всего контейнера
const menu__container = createPopup();
document.querySelector(".container").appendChild(menu__container);
