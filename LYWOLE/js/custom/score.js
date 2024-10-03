var Score = {
    getPoints: function(word, isWordInTitle, isWordIncluded, guessedLetters) {
        let result = 0;
        let wordLen = word.length;
        let glLen = guessedLetters.length; 

        if (!isWordIncluded) {
            return wordLen * (-1);
        }

        if (isWordInTitle) {
            return glLen;
        }

        if (!isWordInTitle) {
            return (glLen * (1 + glLen))/2 
        }
    
        return result;
    }
}
