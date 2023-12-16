var Hint = {
    getHint: function(lines) {
        const letters = this.getLeftLetters();
        let result = '';
        for (let i = 0; i < letters.length; i++) {
            let letter = letters[i];
    
            for (let j = 0; j < lines.length; j++) {
                let line = lines[j].toLowerCase();
    
                if (line.includes(letter)) {
                    let words = line.split(' ');
                    let wordIndexes = [];
                    let countOfWords = 0;
                    for (let k = 0; k < words.length; k++) {
                        let word = words[k];
                        let lettersInWord = word.split('');
                        if (this.isIntersected(lettersInWord, letters)) {
                            wordIndexes.push(k);
                            countOfWords++;
                            if (countOfWords > 1) {
                                break;
                            }
                        }
                    }
    
                    if (countOfWords == 1) {
                        let hint = '';
                        let fff = lines[j].split(' ');
                        for (let k = 0; k < fff.length; k++) {
                            let hintWord = fff[k].replace(/./g, '_');
                            hint += k == wordIndexes[0] ? ` ${hintWord}` : ' ' + fff[k];
                        }
                        result = hint;
                    }
    
    
                    break;
                }
            }
        }

        return result;
    },
    
    isIntersected: function(a, b) {
        const s = new Set(b);
    
        return [...new Set(a)].some(x => s.has(x));
    },
    
    getLeftLetters: function() {
        let letters = [];
    
        $('#letters .letter').not('.guessed').each(function(index) {
            letters.push($(this).data('letter'));
        });
    
        return letters;
    }
}