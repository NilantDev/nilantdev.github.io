var Lywole = {
    day: 0,
    score: 0,
    status: 'start',
    attempts: [],
    letters: [],
    totalScore: 0,
    gameMode: 'just_play',
    darkTheme: true,

    init: function (basil, lang) {
        let lywoly = basil.get(lang);
        if (lywoly === null) {
            this.clear();
            return this;
        }

        const dayOfWeek = this.getDayOfYear();

        if (lywoly.day !== dayOfWeek) {
            this.day = dayOfWeek;
            this.score = 0;
            this.status = 'start';
            this.attempts = this.letters = [];
            this.totalScore = lywoly.totalScore;

            this.saveAsBasil(basil, lang);

            return this;
        }

        this.day = dayOfWeek;

        this.score = lywoly.score;
        $('#score').text(this.score);

        this.letters = lywoly.letters;
        this.letters.forEach(el => {
            $('#letters .letter[data-letter="' + el + '"]').addClass('guessed');
        });

        this.attempts = lywoly.attempts;
        this.totalScore = lywoly.totalScore;
        this.status = lywoly.status;
        this.gameMode = lywoly.gameMode;
        this.darkTheme = lywoly.darkTheme;

        return this;
    },

    saveToLocalStorage: function (basil, attempt, letters) {
        this.day = this.getDayOfYear();
        this.attempts.push(attempt);
        this.letters = this.letters.concat(letters);

        // const lang = DomOperator.getSelectedLang();

        this.saveAsBasil(basil, lang);
    },

    saveAsBasil: function (basil, lang) {
        basil.set(lang, this);
    },

    getDayOfYear: function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);

        return day;
    },

    clear: function () {
        this.day = 0;
        this.score = 0;
        this.status = 'start';
        this.attempts = [];
        this.letters = [];
        this.totalScore = 0;
        this.gameMode = 'just_play';
    }
}