export function createBlock(tag,className){
    const block = document.createElement(tag);
    if(className){
        block.classList.add(className);
    }
    return block;
}

//module.exports = { createBlock };