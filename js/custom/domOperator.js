var DomOperator = {
    fillWithTaskData: function(task) {
        $('#cover').attr('src', task.cover);
        $('#artist').text( task.artist);
        $('#song').text( task.song);
        $('#link').attr('href', task.youtube);
    },

    createLetters: function(letters, definitions) {
        $('#letters').empty();
        let defKeys = Object.keys(definitions);
        let definition = (defKeys.length != 0) ? defKeys.join() : '';
        letters.forEach(letter => {
            let style = definition.includes(letter) ? 'style="text-decoration:underline"' : '';
            $('#letters').append('<span class="letter" data-letter="' + letter + '" ' + style + '>' + letter + '</span>');
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
            'game_mode': hasSetting('game_mode') ? settings['game_mode'] : '',
        };

        // properties.forEach(item => {
        for (const [item, className] of Object.entries(properties)) {
            if (hasSetting(item)) {

                if (settings[item]) {
                    $('body').addClass(className);
                } else {
                    $('body').removeClass(className);
                }
            } 
        };

        function hasSetting(key) {
            return settings && settings.hasOwnProperty(key);
        }
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
    },

    getFirstOpenLetter() {
        return $('.letter:not(.guessed)').data('letter');
    },

    updateFirstOpenLetterOnLabel() {
        let firstLetter = this.getFirstOpenLetter();
        try {
            firstLetter = firstLetter.toUpperCase();
        } catch (error) {
            console.log(firstLetter);
        }
        $('#asked-letter').text(firstLetter);
    }
}