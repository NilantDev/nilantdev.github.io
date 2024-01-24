// let textToCopy = "Song\nBand - Title\nWord not\nScore";


function copyShare() {
    let textToCopy;

    textToCopy = this.getTextToCopy(this.getLines());

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Log a message or perform any other action
    console.log( textToCopy);
}

function getLines() {
    let lines = [];
    let title = $('.lang.selected').data('lang') == 'en' ? 'Lywole' : 'TeaSloBoo';
    lines.push(title + ' #' + Lywole.getDayOfYear());
    lines.push($('#artist').text());
    lines.push($('#song').text());
    let succesLen = $('.attempt.succes').length;
    let failedLen = $('.attempt.failed').length;

    lines.push('✅' + succesLen + ' ⛔' + failedLen);
    lines.push('Score: ' + $('#score').text());
    lines.push('https://nilantdev.github.io/');

    return lines;
}

function getTextToCopy(lines) {
    let result = '';

    lines.forEach(line => {
        result += line + "\n";
    });

    return result;
}