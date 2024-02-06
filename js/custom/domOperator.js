var DomOperator = {
    fillWithTaskData: function(task) {
        $('#cover').attr('src', task.cover);
        $('#artist').text( task.artist);
        $('#song').text( task.song);
        $('#link').attr('href', task.youtube);
    },

    createLetters: function(letters) {
        $('#letters').empty();
        letters.forEach(letter => {
            $('#letters').append('<span class="letter" data-letter="' + letter + '">' + letter + '</span>');
        });
    },

    addMessage: function(text, isShow = true) {
        $('.message-wrapper .message').text(text);
        $('.message-wrapper').toggle(isShow);
    },

    addAttempts: function(attempts) {
        $('#attempts').empty();
        attempts.forEach(el => {
            if (el) {
                this.addAttempt(el.word, el.isWordIncluded, el.points);
            }
        }); 
    },

    addAttempt: function(word, isWordIncluded, points) {
        const classVal = isWordIncluded ? 'succes' : 'failed';
        $('#attempts').append('<div class="attempt-wrapper"><span class="attempt ' + classVal + '">' + word + '</span> <span class="points">' + points + '</span></div>');
    },

    setModes(settings) {
        let properties = {
            darkMode: 'dark-mode',
            sportMode: 'sport-mode'
        };

        // properties.forEach(item => {
        for (const [item, className] of Object.entries(properties)) {
            if (settings && settings.hasOwnProperty(item)) {
                let className = properties[item];
                if (settings[item] == true) {
                    $('body').addClass(className);
                } else {
                    $('body').removeClass(className);
                }
            } 
        };
    },

    toggleActions(isShow) {
        if (isShow) {
            $('.input-actions').show();
            $('.share').hide();
        } else {
            $('.input-actions').hide();
            $('.share').show();
        }
    },

    getSelectedLang() {
        return $('.lang.selected').data('lang');
    },

    getUnguessedLetters() {
        let letters = [];

        $('.letter:not(.guessed)').filter(function() {
            letters.push($(this).data('letter'));
        });

        return letters;
    }
}