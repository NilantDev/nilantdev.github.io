$(document).ready(function () {
    $('.mode').on('click', function () {
        let mode = $(this).data('mode');
        let titles = ['just_play', 'sport_mode', 'a_to_z', 'word_by_word'];
        titles.forEach(title => {
            if ($('body').hasClass(title) && title != mode) {
                $('body').removeClass(title);
            }
        });

        $('body').addClass(mode);

        lywoly.clear();
        lywoly.gameMode = mode;
        gameMode = mode;
        lywoly.saveAsBasil(basil, lang);
        [lyrics, words, letters, lywoly, score, basil, definition] = Task.selectTask(lang);
    });


    let slider = $('.main-wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        // initialSlide: 1,
        swipe: false,
        draggable: false,
        arrows: false
    });

    $('.title').click(function () {
        slider.slick('slickGoTo', 0);
    });
    $('#info').click(function () {
        slider.slick('slickGoTo', 1);
    });
    $('#faq').click(function () {
        slider.slick('slickGoTo', 2);
    });

    // $('#word').keypress(function(e){
    $('#word').keyup(function (e) {
        $('.message-wrapper').hide();
        if (gameMode == 'just_play') {
            $('#checkWord').click();
        }

        if (e.keyCode == 13) {
            $('#checkWord').click();
            $('#word').text('');
        }
    });


    $('#letters').on('click', '.letter', function () {
        let symbol = $(this).data('letter');
        for (const key in definition) {
            if (key.includes(symbol)) {
                DomOperator.addMessage('Hint: ' + definition[key]);

                return;
            }
        }
    })
});