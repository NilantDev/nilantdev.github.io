function getCurrentWeekNumber() {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const diffMilliseconds = currentDate - startOfYear;
    const weekNumber = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24 * 7));

    return weekNumber;
}

function getTaskId() {
    const weekNumber = getCurrentWeekNumber();
    let allData = getBookData();
    let played = getValueFromLocalStorage('played');

    if (getValueFromLocalStorage('last_won') == getToday() && getValueFromLocalStorage('status') == 'won') {
        let lastWonId = played[played.length - 1];

        return lastWonId;
    }

    if (!played || (played && !played.includes(weekNumber)) || (getValueFromLocalStorage('last_won') == getToday())) {
        return weekNumber;
    }

    if (played && played.includes(weekNumber)) {
        for (const [key, value] of Object.entries(allData)) {
            if (!played.includes(key)) {
                saveInLocalStorage('status', 'playing');

                return key;
            }
        }
    }
}

function getDayOfYear(date = new Date()) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return dayOfYear - 252;
}

async function getTask(taskId) {
    if (!taskId) {
        taskId = getDayOfYear();
    }

    const resp = await fetch('https://1caa2d06632f5615.mokky.dev/tasks?id=' + taskId);
    const data = await resp.json();
    let newData = data[0]
    newData['weekNumber'] = taskId;

    if (!resp.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return newData;
}

async function getListItem(taskId) {
    const resp = await fetch('https://1caa2d06632f5615.mokky.dev/list?id=' + taskId);
    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data[0];
}


async function getTaskByIdRange(fromId, toId) {
    const range = 'id[from]=' + fromId + '&id[to]=' + toId;
    const resp = await fetch('https://1caa2d06632f5615.mokky.dev/tasks?' + range);
    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

async function getList() {
    const resp = await fetch('https://1caa2d06632f5615.mokky.dev/list');
    const data = await resp.json();
    // let newData = data[0]
    // newData['weekNumber'] = taskId;

    if (!resp.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
}


function patchStat(taskId, attemptId, value) {
    const url = 'https://1caa2d06632f5615.mokky.dev/stat/' + parseInt(taskId);
    let data = {};
    data[attemptId] = parseInt(value);

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
