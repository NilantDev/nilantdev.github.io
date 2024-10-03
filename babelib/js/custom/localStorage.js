const LOCAL_STORAGE_KEY = 'bookle';

function saveInLocalStorage(key, value) {
    let localStorageItem = getLocalStorageItem();

    localStorageItem[key] = value;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageItem));
}

function getValueFromLocalStorage(key) {
    let localStorageItem = getLocalStorageItem();

    return (key in localStorageItem) ? localStorageItem[key] : '';
}

function getLocalStorageItem() {
    let localStorageItem = localStorage.getItem(LOCAL_STORAGE_KEY);

    return (localStorageItem === null) ? {} : JSON.parse(localStorageItem);
}

function cleanLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}
