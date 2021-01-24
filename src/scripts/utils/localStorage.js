export default class LocalStorage {
    static setData(dataHeader, objectWithData) {
        if (localStorage.getItem(dataHeader)) {
            let data = JSON.parse(localStorage.getItem(dataHeader));
            data.push(objectWithData);
            return localStorage.setItem(dataHeader, JSON.stringify(data));
        }
        return localStorage.setItem(dataHeader, JSON.stringify([objectWithData]));
    }

    static getData(dataHeader) {
        return JSON.parse(localStorage.getItem(dataHeader));
    }
}