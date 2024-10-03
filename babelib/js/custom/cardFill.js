$(document).ready(function () {
    let data = [
        { 'id': 'reader-card', 'title': 'Формуляр', 'sup': '*Нажмите на Имя/Фамилия и начните ввод' },

        { 'id': 'quote_1', 'title': 'Цитата №1', 'colontitle': 'Ц1' },
        { 'id': 'quote_2', 'title': 'Цитата №2', 'colontitle': 'Ц2' },
        { 'id': 'quote_3', 'title': 'Цитата №3', 'colontitle': 'Ц3', 'sup': '*доступна карточка ЖТК' },
        { 'id': 'quote_4', 'title': 'Цитата №4', 'colontitle': 'Ц4', 'sup': '*доступна карточка ПП&Э' },
        { 'id': 'quote_5', 'title': 'Цитата №5', 'colontitle': 'Ц5', 'sup': '*выбери катрочку Начало или Конец' },
        { 'id': 'quote_6', 'title': 'Цитата №6', 'colontitle': 'Ц6', 'sup': '*теперь доступна карточка' },
        { 'id': 'classifier', 'title': 'Жанрово-тематический классификатор', 'colontitle': 'ЖТК' },
        { 'id': 'similars_films', 'title': 'Похожие произведения', 'colontitle': 'ПП&Э' },
        { 'id': 'line_first', 'title': 'Начало', 'colontitle': 'Начало' },
        { 'id': 'line_last', 'title': 'Конец', 'colontitle': 'Конец' },
    ];

    data.forEach(function (value, index) {
        let id = value.id;
        let title = value.title;
        let ctitle = value.colontitle;
        let supText = value.sup;

        $('#' + id + ' .card-title').text(title);
        $('#' + id + ' .colontitile-wrapper .left').text(ctitle);
        $('#' + id + ' .colontitile-wrapper .right').text(ctitle);
        $('#' + id + ' .colontitile-wrapper .right').text(ctitle);
        $('#' + id + ' .sup').text(supText);
    });

});