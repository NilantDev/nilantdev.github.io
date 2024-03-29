var GiveUp = {
    giveUp: function(words, lines, basil) {
        const letters = this.getLeftLetters();
        const allWordsWithLetter = this.getAllWordsWithLetter(words, letters);
        const wordsWithLetter = this.getWordWithLetter(allWordsWithLetter, letters);
        const linesWithWords = this.getLinesWithWords(lines, wordsWithLetter, letters);
        
        $(`#leftLetters`).after('<hr>');
        for (const [key, value] of Object.entries(linesWithWords)) {
            let newLine = value.line.replace(value.word, `<span class="bold">${value.word}</span>`)
            // $(`#leftLetters`).append(`<span class="leftLetter">${key} - </span><span class="leftWord" title="${value.line}">${value.word}</span><br>`);
            $(`#leftLetters`).append(`<span class="leftLetter">${key} - </span><span class="leftWord">${newLine}</span><br>`);
        }
        $(`#leftLetters`).show('slow');
        // $('#giveUp').prop('disabled', true);
        // $('#word').prop('disabled', true);

        lywoly.status = 'giveup';
        DomOperator.addMessage(`You did the best! See you tommorow.`);
        DomOperator.toggleActions(false);
        lywoly.saveToLocalStorage(basil);
    },
    
    getLinesWithWords: function(lines, words, letters) {
        let result = {};
    
        letters.forEach(letter => {
            const word = words[letter];
    
            lines.forEach((line, index, arr) => {
                const tmp = line.toLowerCase();
                if (tmp.includes(word)) {
                    result[letter] = {};
                    result[letter]['word'] = word;
                    result[letter]['line'] = line;
                }
            });
        });
    
        return result;
    },
    
    getLeftLetters: function() {
        let letters = [];
    
        $('#letters .letter').not('.guessed').each(function(index) {
            letters.push($(this).data('letter'));
        });
    
        return letters;
    },
    
    getAllWordsWithLetter: function(words, letters) {
        let wordsWithLetter ={};
    
        letters.forEach(letter => {
            wordsWithLetter[letter] = [];
            words.words.forEach(word => {
                if (word.includes(letter)) {
                    wordsWithLetter[letter].push(word); 
                }
            });
        });
    
        return wordsWithLetter;
    },
    
    getWordWithLetter: function(allWordsWithLetter, letters) {
        let wordsWithLetter = {};
    
        letters.forEach(letter => {
            let words = allWordsWithLetter[letter];
            let index = Math.floor(Math.random() * words.length);
            let word = words[index];
            wordsWithLetter[letter] = word
        });
    
        return wordsWithLetter;
    }
}
