var DomOperator = {
    fillWithTaskData: function(task) {
        $('#cover').attr('src', task.cover);
        $('#artist').text( task.artist);
        $('#song').text( task.song);
        $('#link').attr('href', task.youtube);
    },

    createLetters: function(letters) {
        letters.forEach(letter => {
            $('#letters').append('<span class="letter" data-letter="' + letter + '">' + letter + '</span>');
        });
    },

    addMessage: function(text, isShow = true) {
        $('.message-wrapper .message').text(text);
        $('.message-wrapper').toggle(isShow);
    }
}