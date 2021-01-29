export default class LocalStorage {
    static setArrayData(dataHeader, objectWithData) {
        if (localStorage.getItem(dataHeader)) {
            let data = JSON.parse(localStorage.getItem(dataHeader));
            data.push(objectWithData);
            return localStorage.setItem(dataHeader, JSON.stringify(data));
        }
        return localStorage.setItem(dataHeader, JSON.stringify([objectWithData]));
    }   
    
    static setObjectData(dataHeader, objectWithData) {
        return localStorage.setItem(dataHeader, JSON.stringify(objectWithData));
    }

    static getData(dataHeader) {
        return JSON.parse(localStorage.getItem(dataHeader));
    }


}