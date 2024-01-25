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

    $('.share-note').css('display', 'block');    
}

function getLines() {
    let lines = [];
    let title = $('.lang.selected').data('lang') == 'en' ? 'LYWOLE' : 'TeaSloBoo';
    lines.push('————' + title + ' #' + Lywole.getDayOfYear() + '————');
    lines.push($('#artist').text() + ' - ' + $('#song').text());
    let succesLen = $('.attempt.succes').length;
    let failedLen = $('.attempt.failed').length;

    lines.push('😎' + $('#score').text() + ' ✅' + succesLen + ' ⛔' + failedLen);
    lines.push('');
    lines.push('https://nilantdev.github.io/');
    lines.push('———————————————');

    return lines;
}

function getTextToCopy(lines) {
    let result = '';

    lines.forEach(line => {
        result += line + "\n";
    });

    return result;
}