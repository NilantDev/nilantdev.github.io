async function getStatById(taskId) {
    const resp = await fetch('https://1caa2d06632f5615.mokky.dev/stat?id=' + parseInt(taskId));
    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

async function patchStat(taskId, key, value) {
    const url = 'https://1caa2d06632f5615.mokky.dev/stat/' + parseInt(taskId);
    let data = {};
    data[key] = parseInt(value);

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log('Success:', data);
    }).catch(error => {
        console.error('Error:', error);
    });
}

async function updateStat(taskId, isWon, step) {
    let data = await getStatById(taskId);
    const key = isWon ? 'attempt_' + step : 'lost';
    let value = data[0][key];
    value++;
    await patchStat(taskId, key, value);

    return data[0];
}