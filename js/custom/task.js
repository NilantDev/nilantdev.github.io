var Task = {
    getTodayTask: function(songs, lyrics, lang) {
        const date = new Date();
        // let dayOfWeek = date.getDay() == 0 ? 7 : date.getDay();
        // console.log(dayOfWeek);

        let dayOfWeek = date.getDate() - 1;

        let result = songs[lang][dayOfWeek];
        result['lyrics'] = lyrics[lang][dayOfWeek]['lyrics'].split('\n');;
    
        return result;
    },


    selectTask: function (lang) {
        // Get song info and lyrics
        let task = Task.getTodayTask(
            getWeekSongs(),
            getWeekLyrics(),
            lang
        );

        // Get Lyrics, words and letters
        const lyrics = task.lyrics;
        let words = new Words(lyrics, task.song);
        let letters = new Letters(words.words);

        let definition = task.definition == undefined ? {} : task.definition;
        // Fill DOM with data
        DomOperator.fillWithTaskData(task);
        DomOperator.createLetters(letters.letters, definition);

        //////////////////_INIT_////////////////////////////////////

        let options = {
            namespace: 'lywoly',
            storage: 'local'
        };

        let basil = new window.Basil(options);
        let lywoly = Lywole.init(basil, lang);
        let score = lywoly.score;
        DomOperator.addAttempts(lywoly.attempts);
        if (['won', 'giveup'].includes(lywoly.status)) {
            DomOperator.toggleActions(false);
        } else {
            DomOperator.toggleActions(true);
        }

        DomOperator.updateFirstOpenLetterOnLabel();

        return [lyrics, words, letters, lywoly, score, basil, definition];
    }
}