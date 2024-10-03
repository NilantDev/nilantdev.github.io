
$(document).ready(function () {
    // let titles = ['darkMode', 'just_play', 'sport_mode', 'a_to_z', 'word_by_word'];

    // let options = {
    //     namespace: 'lywoly',
    //     storage: 'local'
    // };

    // basil = new window.Basil(options);
    // settings = basil.get('settings');
    // if (!settings) {
    //     settings = {};
    // }

    // // Game mode
    // if (settings['game_mode']) {
    //     $('#' + settings['game_mode']).prop('checked', true);
    // }

    // titles.forEach(title => {
    //     let tmpSetting = false;
    //     if (settings !== null) {
    //         tmpSetting = settings[title];
    //     }

    //     if (tmpSetting) {
    //         $('#' + title).prop('checked', tmpSetting);
    //     }

    //     $('#' + title).change(function () {
    //         let elemTitle = '';
    //         let elemValue = '';

    //         if ($('#' + title).attr('type') == 'radio') {
    //             elemTitle = $('#' + title).prop('name');
    //             elemValue = $('#' + title).prop('id');
    //         } else {
    //             elemTitle = title;
    //             elemValue = $('#' + title).prop('checked');
    //         }

    //         settings[elemTitle] = elemValue;
    //         basil.set('settings', settings);
    //         DomOperator.setModes(settings);
    //     });
    // });

    // DomOperator.setModes(settings);


    $('#theme-selector').on('click', function () {
        $('body').toggleClass('dark-mode');
    });

    $('#replay, .modes').on('click', function () {
        $('.modes').toggleClass('hidden');
    });

    $(document).mouseup(function (e) {
        var container = $(".modes");
        if(!container.hasClass('hidden') && !container.is(e.target) && container.has(e.target).length === 0){
            container.addClass('hidden');
        }
    });
});