
class Words {

    words = [];
    wordsInTitle = [];
    
    interjections=  [
        'ah',
        'hey', 'huh',
        'mm', 'mm-mm','mmm',
        'nah',
        'oh', 'ooh', 'oh-oh',
        'uh',
        'whoo',
        'yeah',
        'е-а', 'оу-о-о-о',
        'oh-i-oh-i-oh-i-oh-i', // Ed Sheeran - Shape of you
        'i-i-i-i-i-i', 'ah-ah', 'ah-ah-ah', 'whoa-oh', // DNCE - Cake by the Ocean
        'oh-oh-oh-oh', 'oh-oh-oh-oh-oh-oh', // ABBA - Money
        'у-у',
        'ha', 'haha', 'ha-ha-ha-ha-ha', 'hahaha', 'hahahahaha', 'hahahahahaha', 'hahahahahahahahahahahahahahahahaha',
    ];

    constructor(lyrics, title) {
        this.words = this.getUniqueWords(lyrics);
        this.wordsInTitle = this.getWordsFromTitle(title);
    }

    getUniqueWords(lyrics) {
        let allWords = [];
    
        lyrics.forEach(item => {
            let line = item;
            line = line.toLowerCase();
            line = this.removeSpecChars(line);
    
            let words = line.split(' ');
            words = this.removeInterjections(words);
            
            for (var i = 0; i < words.length; i++) {
                words[i] = this.removeSingleQuotesFromWord(words[i]) 
            }
    
            allWords = allWords.concat(words);
        });
    
        function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
        }
    
        var uniqueWords = allWords.filter(onlyUnique);
    
        return uniqueWords;
    }
    
    removeSpecChars(line)
    {
        var pattern = /["«».,!:;()\[\]?—–01234567890]/g;
    
        return line.replace(pattern, '');
    }
    
    removeInterjections(words)
    {
        let self = this;

        return words.filter(word => !self.interjections.includes(word));
    }
    
    removeSingleQuotesFromWord(word)
    {
        if (word.endsWith("in'")) {
            word = word.slice(0, -3) + "ing";
        }
    
        if (word.startsWith("'")) {
            word = word.replace("'", '');
        }
    
        if (word.endsWith("'s")) {
            word = word.slice(0, -2);
        }
    
        return word;
    }

    isWordIncluded(word, words) {
        word = word.toLowerCase().trim();

        return isWordIncludes = words.includes(word);    
    }

    getWordsFromTitle(title) {
        return this.removeSpecChars(title).toLowerCase().split(' ');
    }
} 