//функция создания блока с определенными тегами и классами
export function createBlock(tag,className){
    const block = document.createElement(tag);
    if(className){
        block.classList.add(className);
    }
    return block;
}

//функция создания одного листа и его возврата
function createList() {
    const list = createBlock("div", "list");
    const list__header = createBlock("div", "list__header")
    const list__title = createBlock("h4", "list__title");
    list__title.innerHTML = "List";
    list__title.contentEditable = "false";
    const list__header__button__delete = createBlock("button", "list__header__button__delete");
    list__header__button__delete.addEventListener('click', function(e) {
        deleteList(e);
    });
    const list__header__button__edit = createBlock("button", "list__header__button__edit");
    list__header__button__edit.value = "Edit";
    list__header__button__edit.addEventListener('click', function(e) {
        editSaveTitleList(e);
    });
    const list__content = createBlock("div", "list__content");
    const button_createItem = createBlock("button", "button_createItem");
    button_createItem.addEventListener('click', function(e) {
        outputItem(e);
    });
    list.appendChild(list__header);
    list.appendChild(list__content);
    list__header.appendChild(list__header__button__delete);
    list__header.appendChild(list__title);
    list__header.appendChild(list__header__button__edit);
    list__content.appendChild(button_createItem);
    return list;
}

//функция создания одного item и его возврата
function createItem() {
    const item = createBlock("div", "item");
    const item__text = createBlock("p", "item__text");
    const item__button__edit = createBlock("button", "item__button__edit");
    const item__button__delete =createBlock("button", "item__button__delete")
    item__button__edit.addEventListener('click', function(e) {
        editSaveTextItem(e);
    });
    item__button__delete.addEventListener('click', function(e) {
        deleteItem(e);
    });
    item__button__edit.value = "Edit";
    item__text.innerHTML = "Item";
    item.appendChild(item__button__delete);
    item.appendChild(item__text);
    item.appendChild(item__button__edit);
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
}

//редактирование и сохранение изменения заголовка листа
const editSaveTitleList = function(e) {
    const list = e.target.parentNode.querySelector('.list__title');
	if (e.target.value == 'Edit') {
		e.target.value = 'Save';
		list.contentEditable = true;
        list.focus();
	}
	else {
		e.target.value = 'Edit';
		list.contentEditable = false;
	}
}

//редактирование и сохранение измениния заголовка листа
const editSaveTextItem = function(e) {
	const item = e.target.parentNode.querySelector('.item__text');
	if (e.target.value == 'Edit') {
		e.target.value = 'Save';
		item.contentEditable = true;
        item.focus();
	}
	else {
		e.target.value = 'Edit';
		item.contentEditable = false;
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

document.querySelector('.button-createList').addEventListener('click', outputList);

