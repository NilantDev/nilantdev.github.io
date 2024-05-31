
class Words {

    words = [];
    wordsInTitle = [];
    guessedWords = [];

    interjections = [];

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

            for (let i = 0; i < words.length; i++) {
                words[i] = this.removeSingleQuotesFromWord(words[i])
            }

            allWords = allWords.concat(words);
        });

        function onlyUnique(value, index, array) {
            return array.indexOf(value) === index;
        }

        return allWords.filter(onlyUnique);
    }

    removeSpecChars(line) {
        const pattern = /["«».,!:;()\[\]?—–]/g;

        return line.replace(pattern, '');
    }

    removeInterjections(words) {
        let self = this;

        return words.filter(word => !self.interjections.includes(word));
    }

    removeSingleQuotesFromWord(word) {
        if (word.endsWith("in'")) {
            word = word.slice(0, -3) + "ing";
        }

        if (word.startsWith("'")) {
            word = word.replace("'", '');
        }

        return word;
    }

    isWordIncluded(word, words) {
        word = word.toLowerCase().trim();

        return words.includes(word);
    }

    getWordsFromTitle(title) {
        return this.removeSpecChars(title).toLowerCase().split(' ');
    }

    addGuessedWord(word) {
        this.guessedWords.push(word);
    }

    checkWord() {
        let word = $('#word').val().toLowerCase().trim();

        // TODO ёфицировать
        word = word.replace('ё', 'е');

        if (gameMode == 'a_to_z') {
            let firstOpenLetter = DomOperator.getFirstOpenLetter();
            console.log(firstOpenLetter);
            if (!word.includes(firstOpenLetter)) {
                let message = `"${word}" doesn't contain letter ${firstOpenLetter.toUpperCase()}.`;
                DomOperator.addMessage(message);

                return;
            }
        }

        let isWordInAttempts = lywoly.attempts.find(obj => obj.word === word);

        if (word == '' || isWordInAttempts != undefined) {
            if (gameMode != 'just_play') {
                let message = word == '' ? 'You cannot input empty line' : "This word was already input";
                DomOperator.addMessage(message);
                $('#word').val('');
            }

            return;
        }

        let guessedLetters = letters.guessedLetters;
        let isWordIncluded = this.isWordIncluded(word, this.words);

        if (gameMode == 'just_play' && !isWordIncluded) {
            return;
        }

        if (isWordIncluded) {
            letters.addGuessedLetters(word);
            words.addGuessedWord(word);
        }

        let points = Score.getPoints(
            word,
            words.wordsInTitle.includes(word),
            isWordIncluded,
            letters.guessedLetters
        );

        if (isWordIncluded) {
            let hint = Hint.getHint(lyrics);

            if (hint) {
                $('#getHint').attr('disabled', false);
            } else {
                $('#getHint').attr('disabled', true);
            }
        }

        DomOperator.addAttempt(word, isWordIncluded, points);

        score += points;

        let allGuessedLetters = [];
        $('#letters .letter.guessed').each(function (index) {
            allGuessedLetters.push($(this).data('letter'));
        });

        if (gameMode == 'word_by_word') {
            this.wordToWordExecute(isWordIncluded, word, allGuessedLetters);
            this.openWordsInLyrics(allGuessedLetters);
        }

        if (gameMode == 'a_to_z') {
            DomOperator.updateFirstOpenLetterOnLabel();
        }

        // $("#max-score").text(letters.getWordWithMaxScore(
        //     words.words, words.guessedWords
        // ));

        // You won

        if (allGuessedLetters.sort().join(',') === letters.letters.sort().join(',')) {
            lywoly.status = 'won';
            // score += 10;
            DomOperator.addMessage(`You won! Congratulations!`);
            DomOperator.toggleActions(false);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }

        $('#score').text(score);

        lywoly.score = score;

        lywoly.saveToLocalStorage(
            basil,
            {
                word: word,
                isWordIncluded: isWordIncluded,
                points: points,
            },
            isWordIncluded ? letters.guessedLetters : []
        );

        $('#word').val('');
    }

    wordToWordExecute(isWordIncluded, word) {
        if (isWordIncluded) {
            let wbw = $('#lyrics span.hidden-word:first').data('word');

            if (wbw == word) {
                let wbwSelector = '#lyrics span[data-word="' + wbw + '"]';
                $(wbwSelector).removeClass('hidden-word');
                let wbwElements = $(wbwSelector);
                wbwElements.each(function (index, element) {
                    $(element).text($(element).data('orig-word'));
                });
            }
        }
    }

    openWordsInLyrics(allGuessedLetters) {
        let wbws = $('#lyrics span.hidden-word');
        let self = this;
        wbws.each(function(index, wbw) {
            let word = $(wbw).data('word');
            if (self.allLettersInArray(word, allGuessedLetters)) {
                let wbwSelector = '#lyrics span[data-word="' + word + '"]';
                $(wbwSelector).removeClass('hidden-word');
                let wbwElements = $(wbwSelector);
                wbwElements.each(function (index, element) {
                    $(element).text($(element).data('orig-word'));
                });
            }
        });
    }


    allLettersInArray(word, letters) {
        const wordLetters = [...new Set(word.toString())];
        return wordLetters.every(letter => letters.includes(letter));
    }
} 