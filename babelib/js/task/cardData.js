function getCardData() {
    return [
        {
            'code': 'quote_1',
            'title': 'Цитата №1',
            'colontitle': 'Ц1',
            'zIndex': 10,
            'blocked': false
        },
        {
            'code': 'quote_2',
            'title': 'Цитата №2',
            'colontitle': 'Ц2',
            'zIndex': 9,
            'blocked': true
        },
        {
            'code': 'quote_3',
            'title': 'Цитата №3',
            'colontitle': 'Ц3',
            'sup': '*доступна карточка ЖТК',
            'zIndex': 8,
            'blocked': true,
            'additional_card': 'classifier'
        },
        {
            'code': 'quote_4',
            'title': 'Цитата №4',
            'colontitle': 'Ц4',
            'sup': '*доступна карточка ПП&Э',
            'zIndex': 7,
            'blocked': true,
            'additional_card': 'similars_films'
        },
        {
            'code': 'quote_5',
            'title': 'Цитата №5',
            'colontitle': 'Ц5',
            'sup': '*выбери катрочку Начало или Конец',
            'zIndex': 6,
            'blocked': true
        },
        {
            'code': 'quote_6',
            'title': 'Цитата №6',
            'colontitle': 'Ц6',
            'sup': '*теперь доступна карточка', 'zIndex': 5,
            'blocked': true
        },
        {
            'code': 'classifier',
            'title': 'Жанрово-тематический классификатор',
            'colontitle': 'ЖТК',
            'zIndex': 4,
            'blocked': true
        },
        {
            'code': 'similars_films',
            'title': 'Похожое и кино',
            'colontitle': 'ПП&Э',
            'zIndex': 3,
            'blocked': true
        },
        {
            'code': 'line_first',
            'title': 'Начало',
            'colontitle': 'Начало',
            'zIndex': 2,
            'blocked': true
        },
        {
            'code': 'line_last',
            'title': 'Конец',
            'colontitle': 'Конец',
            'sup': 'Last card', 
            'zIndex': 1,
            'blocked': true,
        },
    ]
};