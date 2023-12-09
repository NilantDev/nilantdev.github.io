var Letter = {
    getGuessedLetters: function(word) {
        let result = [];
        let uniqueLetters = this.getUniqueLetters([word]);
    
        for(var i = 0; i < uniqueLetters.length; i++) {
            let letter = uniqueLetters[i];
            let letterClass = $('#letters .letter[data-letter="' + letter + '"]').attr('class');
            if (letterClass &&
                !letterClass.includes('guessed') &&
                !result.includes(letter))
            { // TODO constant
                result.push(letter);
            }
        }
    
        return result;
    },

    setGuessedLetters: function(word) {
        let guessedLetters = this.getGuessedLetters(word);

        for(var i = 0; i < guessedLetters.length; i++) {
            let letter = guessedLetters[i];
            $(`#letters .letter[data-letter="${letter}"]`).addClass('guessed');
        }
    },

    getUniqueLetters: function(words) {
        let letters = [];
        let symbolsToPass = ["'", '-', '"', '&', '-'];
    
        words.forEach(word => {
            for(var i=0; i < word.length; i++) {
                let letter = word[i];
                
                if (symbolsToPass.includes(letter)) {
                    continue;
                }
    
                if (!letters.includes(letter)) {
                    letters.push(letter);
                }
            }
        });
    
        letters.sort();
    
        return letters;
    },
}