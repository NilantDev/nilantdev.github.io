class Letters {
    letters = [];
    guessedLetters = [];

    constructor(words) {
        this.letters = this.getUniqueLetters(words);
    }

    getGuessedLetters(word) {
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
    }

    addGuessedLetters(word) {
        let guessedLetters = this.getGuessedLetters(word);

        for(var i = 0; i < guessedLetters.length; i++) {
            let letter = guessedLetters[i];
            $(`#letters .letter[data-letter="${letter}"]`).addClass('guessed');
        }

        this.guessedLetters = guessedLetters;
    }

    getUniqueLetters(words) {
        let letters = [];
        let symbolsToPass = ["'", '-', '"', '&', '-', '…'];
    
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
    }

    getWordWithMaxScore(words, guessedWords) {
        let maxScore = 0;
        let maxWord = '';
        let allGuessedLetters = [];
            $('#letters .letter.guessed').each(function(index) {
                allGuessedLetters.push($(this).data('letter'));
            });
        words.forEach(word => {
            if (word.length < maxScore) {
                return;
            }

            if (guessedWords.includes(word)) {
                return;
            }

            let uniqueLetters = this.getUniqueLetters([word]);
            
            const filteredArray = uniqueLetters.filter(element => !allGuessedLetters.includes(element));

            if (filteredArray.length > maxScore) {
                maxScore = filteredArray.length;
                maxWord = word;
            }
        });

        return maxWord;
    }
}