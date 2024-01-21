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
            this.addAttempt(el.word, el.isWordIncluded, el.points);
        }); 
    },

    addAttempt: function(word, isWordIncluded, points) {
        const classVal = isWordIncluded ? 'succes' : 'failed';
        $('#attempts').append('<div class="attempt-wrapper"><span class="attempt ' + classVal + '">' + word + '</span> <span class="points">' + points + '</span></div>');
    },

    setModes(settings) {
        if (settings.darkMode == true) {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }

        if (settings.sportMode == true) {
            $('body').addClass('sport-mode');
        } else {
            $('body').removeClass('sport-mode');
        }
    }
}