
var Word = {
    interjections: [
            'ah',
            'hey', 'huh',
            'mm',
            'nah',
            'oh', 'ooh', 
            'uh',
            'whoo',
            // 'yeah',
            'е-а', 'оу-о-о-о',
            'oh-i-oh-i-oh-i-oh-i', // Ed Sheeran - Shap of you
            'i-i-i-i-i-i', 'ah-ah', 'ah-ah-ah', 'whoa-oh', // DNCE - Cake by the Ocean 
    ],

    getUniqueWords: function(lyrics) {
        let allWords = [];
    
        lyrics.forEach(item => {
            line = item;
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
    },
    
    removeSpecChars: function(line)
    {
        var pattern = /["«».,!:;()\[\]?—–01234567890]/g;
    
        return line.replace(pattern, '');
    },
    
    removeInterjections: function(words)
    {
        let self = this;

        return words.filter(word => !self.interjections.includes(word));
    },
    
    removeSingleQuotesFromWord: function(word)
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
    },

    isWordIncluded: function(word, words) {
        word = word.toLowerCase().trim();

        return isWordIncludes = words.includes(word);    
    },

    isWordInTitle: function(word, title) {
        let titles = this.removeSpecChars(title).toLowerCase().split(' ');
    
        return titles.includes(word);
    },
} 