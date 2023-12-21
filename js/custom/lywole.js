var Lywole = {
    day: 0,
    score: 0,
    status: 'start',
    attempts: [],
    letters: [],
    totalScore: 0,

    init: function(basil) {
        let lywoly = basil.get('lywoly');
        if (lywoly === null) {
            return this;
        }

        const dayOfWeek = this.getDayOfWeek();

        if (lywoly.day !== dayOfWeek) {
            this.day = dayOfWeek;
            this.score = 0;
            this.attempts = this.letters = [];
            this.totalScore = lywoly.totalScore;

            this.saveAsBasil(basil);

            return this;
        }
        
        this.day = dayOfWeek;

        this.score = lywoly.score;
        $('#score').text(this.score);
        
        this.letters = lywoly.letters;
        this.letters.forEach(el => {
            $('#letters .letter[data-letter="' + el   + '"]').addClass('guessed');
        });

        this.attempts = lywoly.attempts;
        this.attempts.forEach(el => {
            this.addAttemptToDom(el.word, el.isWordIncluded, el.points);
        });

        this.totalScore = lywoly.totalScore;

        this.status = lywoly.status;

        return this;
    },

    saveToLocalStorage: function(score, attempt, letters, basil) {
        this.day = this.getDayOfWeek();
        this.score = score;
        this.attempts.push(attempt);
        this.letters = this.letters.concat(letters);

        this.saveAsBasil(basil);
    },

    saveAsBasil: function(basil) {
        basil.set('lywoly', this);
    },

    addAttemptToDom: function(word, isWordIncluded, points) {
        const classVal = isWordIncluded ? 'succes' : 'failed';
        $('#attempts').append('<div class="attempt-wrapper"><span class="attempt ' + classVal + '">' + word + '</span> <span class="points">' + points + '</span></div>');
    },

    getDayOfWeek: function() {
        const date = new Date();

        return date.getDay();
    }
}