async function update() {
    const lastVersion = 1;
    let version = getValueFromLocalStorage('version');
    
    if (!version) version = 0;

    if (version < 1) {
        await updateV1();
    }

    saveInLocalStorage('version', lastVersion);
}

async function updateV1() {
    for (i = 35; i < 116; i++) {
        let item = getLocalStorageItem(i);
        if (Object.keys(item).length !== 0) {
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