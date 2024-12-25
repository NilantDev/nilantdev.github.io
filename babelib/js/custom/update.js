async function update() {
    const lastVersion = 1;
    let version = getValueFromLocalStorage('version');
    let messageElement = document.getElementById('update-message');
    // if (!version) version = 0;

    // if (version < 1) {
    //     messageElement.innerHTML = `Обновление ${version} / ${lastVersion}`;
    //     await updateV1(version, lastVersion);
    //     version++;
    //     saveInLocalStorage('version', lastVersion);
    //     messageElement.innerHTML = `Обновление ${version} / ${lastVersion}`;
    // }

    messageElement.innerHTML = ``;
}

async function updateV1(version, lastVersion) {
    for (i = 35; i < 116; i++) {
        let messageElement = document.getElementById('update-message');
        messageElement.innerHTML = `Обновление ${version} / ${lastVersion} - ${i} / 116`;
        let item = getLocalStorageItem(i);
        if (Object.keys(item).length !== 0 && !Object.values(item).includes('won')) {
            let task = await getTask(i);
            let listItem = await getListItem(task.fantlab_id);
            let title = listItem.author + ' - ' + listItem.title;

            let attempts = item.attempts;

            attempts.forEach((element, index) => {
                if (element == title) {
                    attempts[index] = 'won';
                }
            })

            saveInLocalStorage('attempts', attempts, i);
        }
    }
}