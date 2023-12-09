var GiveUp = {
    giveUp: function(words, lines) {
        const letters = this.getLeftLetters();
        const allWordsWithLetter = this.getAllWordsWithLetter(words, letters);
        const wordsWithLetter = this.getWordWithLetter(allWordsWithLetter, letters);
        const linesWithWords = this.getLinesWithWords(lines, wordsWithLetter, letters);
    
        for (const [key, value] of Object.entries(linesWithWords)) {
            $(`#leftLetters`).append(`<span class="leftLetter">${key} - </span><span class="leftWord" title="${value.line}">${value.word}</span><br>`);
        }
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
            words.forEach(word => {
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
