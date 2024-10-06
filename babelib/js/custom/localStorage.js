const LOCAL_STORAGE_KEY = 'bookle';

function saveInLocalStorage(key, value, weekNumber = '') {
    let localStorageItem = getLocalStorageItem(weekNumber);

    localStorageItem[key] = value;

    localStorage.setItem(LOCAL_STORAGE_KEY + String(weekNumber), JSON.stringify(localStorageItem));
}

function getValueFromLocalStorage(key, weekNumber = '') {
    let localStorageItem = getLocalStorageItem(weekNumber);

    return (key in localStorageItem) ? localStorageItem[key] : '';
}

function getLocalStorageItem(weekNumber) {
    let localStorageItem = localStorage.getItem(LOCAL_STORAGE_KEY + String(weekNumber));

    return (localStorageItem === null) ? {} : JSON.parse(localStorageItem);
}

function cleanLocalStorage(weekNumber) {
    localStorage.removeItem(LOCAL_STORAGE_KEY + String(weekNumber))
}
