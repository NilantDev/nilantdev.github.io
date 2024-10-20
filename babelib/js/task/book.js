function getCurrentWeekNumber() {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const diffMilliseconds = currentDate - startOfYear;
    const weekNumber = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24 * 7));

    return weekNumber;
}

function getTaskId() {
    const weekNumber = getCurrentWeekNumber();
    let allData = getBookData();
    let played = getValueFromLocalStorage('played');

    if (getValueFromLocalStorage('last_won') == getToday() && getValueFromLocalStorage('status') == 'won') {
        let lastWonId = played[played.length - 1];

        return lastWonId;
    }

    if (!played || (played && !played.includes(weekNumber)) || (getValueFromLocalStorage('last_won') == getToday())) {
        return weekNumber;
    }

    if (played && played.includes(weekNumber)) {
        for (const [key, value] of Object.entries(allData)) {
            if (!played.includes(key)) {
                saveInLocalStorage('status', 'playing');

                return key;
            }
        }
    }
}

function getDayOfYear(date = new Date()) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return dayOfYear - 252;
}

async function getTask(taskId) {
    if (!taskId) {
        taskId = getDayOfYear();
    }

    const resp = await fetch('https://1caa2d06632f5615.mokky.dev/tasks?id=' + taskId);
    const data = await resp.json();
    let newData = data[0]
    newData['weekNumber'] = taskId;

    if (!resp.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return newData;
}


async function getTaskByIdRange(fromId, toId) {
    const range = 'id[from]=' + fromId + '&id[to]=' + toId;
    const resp = await fetch('https://1caa2d06632f5615.mokky.dev/tasks?' + range);
    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}


function patchStat(taskId, attemptId, value) {
    const url = 'https://1caa2d06632f5615.mokky.dev/stat/' + parseInt(taskId);
    let data = {};
    data[attemptId] = parseInt(value);

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function getBookData() {
    return {
        '35': {
            'id': '1666',
            'author': 'Дж. Р. Р. Толкин',
            'title': 'Хоббит, или Туда и обратно',
            'year': '1937',
            'translator': 'Яхнин Л.Л.',
            'quote_1': 'К тому же мы теперь знаем о дырке в алмазном жилете гнусного змея.',
            'quote_2': 'Это и в самом деле были орлы. Подгоняемые ветром, они приближались ряд за рядом, словно собранное из всех гнезд Севера могучее крылатое войско.',
            'quote_3': 'А бочки одна за другой с грохотом ухали в темную дыру и глухо бухались в холодную воду.',
            'quote_4': '– А еще сладких пирожков и сыра, – поспешил добавить Бофур.<br>– Пирог с поросятинкой и салат, – облизнулся Бомбур.',
            'quote_5': 'Это он, мистер Бэггинс, сам, своими руками в непроглядной темноте и без всякой помощи волшебника или там гномов убил гигантского паука!',
            'quote_6': 'Спас-сибо, моя прелес-сть! С-сейчас-сс у нас-с будет с-сладкий кус-сочек на ужин!',
            'line_first': 'Хоббит жил себе поживал в норе под землей.',
            'line_last': '– И очень хорошо! – беспечно рассмеялся Бильбо и протянул волшебнику табакерку.',
            'classificatory': {
                'genre': 'Фэнтези',
                'genre_code': 'fantasy',
                'general': 'Приключенческое',
                'place': 'Другой мир, не связанный с нашим',
                'time': 'Неопределённое время действия',
                'plot': 'Путешествие к особой цели | Фантастические существа',
                'line': 'Линейный',
                'age': 'Любой',
            },
            'similars': [
                'Клайв Стейплз Льюис «Нарния»',
                'Ник Перумов «Эльфийский клинок»',
                'Туве Янссон «Муми-тролль и комета»',
            ],
            'films': [
                '«Сказочное путешествие мистера XXXXXX XXXXXXXX, XXXXXXX» 1985, СССР, реж: Владимир Латышев',
                '«XXXXXX» 1977, США, реж: Жуль Басс, Артур Ранкин мл.',
                '«XXXXXX: Нежданное путешествие» 2012, США, Новая Зеландия, реж: Питер Джексон',
            ],
        },
        '36': {
            'id': '7182',
            'author': 'Жюль Верн',
            'title': 'Двадцать тысяч лье под водой',
            'year': '1870',
            'translator': 'Яковлева Н.Г., Корш Е.Ф.',
            'quote_1': '...менее чем в десять месяцев, я проплыл <..80000 тысяч километров..> и совершил кругосветное путешествие, которое открыло мне такое множество чудес...',
            'quote_2': 'Склонившись над витриной, он уже бормотал что-то на языке натуралистов: «…брюхоногие, класс животных из типа моллюсков, семейство трубачей, вид Мадагаскарской ципреи…»',
            'quote_3': 'Нед Ленд, уроженец Канады, был искуснейшим китобоем, не знавшим соперников в своем опасном ремесле.',
            'quote_4': 'И через короткое время вы, господин профессор, переправитесь через мой Аравийский туннель!',
            'quote_5': '— Курительная? — воскликнул я. — Курительная на борту «Наутилуса»?',
            'quote_6': '— Сударь, — отвечал капитан, — я для вас капитан Немо, а вы для меня, как и ваши спутники, только пассажиры «Наутилуса».',
            'line_first': '1866 год ознаменовался удивительным происшествием, которое, вероятно, еще многим памятно.',
            'line_last': 'Но дать ему ответ из всех людей имеют право только двое: капитан Немо и я.',
            'classificatory': {
                'genre': 'Фантастика',
                'genre_code': 'scifi',
                'general': 'Приключенческое',
                'place': 'Мировой океан, моря | Подводный мир',
                'time': 'Вторая половина 19 века',
                'plot': 'Изобретения и научные исследования',
                'line': 'Линейный',
                'age': 'Любой',
            },
            'similars': [
                'Григорий Адамов «Тайна двух океанов»',
                'Борис Акунин «Планета Вода»',
                'Артур Конан Дойл «Маракотова бездна»',
            ],
            'films': [
                '«Капитан Немо и подводный город» 1969, Великобритания, реж: Джеймс Хилл',
                '«Капитан Немо» 1975, СССР, реж: Василий Левин',
            ],
        },
        '37': {
            'id': '13893',
            'author': 'Брэм Стокер',
            'title': 'Дракула',
            'year': '1897',
            'translator': 'Нина Сандрова',
            'quote_1': 'Благодаря любезности инспектора министерства торговли мне было разрешено просмотреть судовой журнал «Деметры», который аккуратно заполняли, за исключением трех последних дней, но там не оказалось ничего особо интересного, кроме факта пропажи людей.',
            'quote_2': '- Прислушайтесь к ним, к детям ночи! Что за музыку они заводят!',
            'quote_3': '– Я отрублю ей голову, набью рот чесноком и вобью кол в ее тело.',
            'quote_4': 'В Трансильвании живут четыре различные народности: на юге – саксонцы вперемешку с валахами, народом, происходящим от даков; на западе венгры, и секли на востоке и севере.',
            'quote_5': 'Я в полном недоумении, поэтому решился на следующий шаг: я списался с моим старым учителем и добрым другом профессором Ван Хелсингом из Амстердама, который великолепно разбирается в сомнительных случаях, и просил его приехать.',
            'quote_6': 'Носферату не умирает, как пчела, после того как ужалит.',
            'line_first': 'Выехал из Мюнхена 1 мая в 8.35 вечера и прибыл в Вену рано утром на следующий день; должен был приехать в 6.46, но поезд опоздал на час.',
            'line_last': 'Ему уже известны ее доброта и любовь, а со временем он поймет, за что она была столь любима многими и почему они ради нее решились на такое.',
            'classificatory': {
                'genre': 'Хоррор/Ужасы | Мистика',
                'genre_code': 'horror',
                'general': 'Приключенческое | Психологическое',
                'place': 'Австро-венгрия | Великобритания',
                'time': 'Конец 19 века',
                'plot': 'Фантастические существа',
                'line': '',
                'age': 'Любой',
            },
            'similars': [
                'Стивен Кинг «Жребий»',
                'Мэри Шелли «Франкенштейн, или Современный Прометей»',
                'Джозеф Шеридан Ле Фаню «Кармилла»',
            ],
            'films': [
                '«Носферату, симфония ужаса» 1922, Германия, реж: Фридрих Вильгельм Мурнау',
                '«XXXXXXX Брэма Стокера» 1992, США, реж: Френсис Форд Коппола',
            ],
        },
        '38': {
            'id': '16230',
            'author': 'Энтони Бёрджесс',
            'title': 'Заводной апельсин',
            'year': '1962',
            'translator': 'Бошняк В.Б.',
            'quote_1': 'Ладно, поехали, начинаю самую жалостную, даже трагическую часть своей истории, о братья мои и други единственные, которая разворачивалась в гостюрьме номер 84-ф.',
            'quote_2': '...спросить насчет давно обещанной и давно заказанной пластинки с записью Девятой (она же Хоральная) симфонии Бетховена (фирма «Мастер-строук», дирижер Л. Мухайвир).',
            'quote_3': '...там все больше шла душеспасительная говорильня, а про войны и всякие там sunnvynn почти ничего не было.',
            'quote_4': 'Потом я поглядел на верхнюю страницу с заглавием – «ЗАВОДНОЙ АПЕЛЬСИН» – и говорю: – Фу, до чего глупое название. Слыханное дело – заводной апельсин?',
            'quote_5': 'В общем, отвязали они меня от кресла, освободили кожу над глазами, чтобы я мог открывать и закрывать их, и я их закрыл – о, бллин, какая боль и буханье было у меня в голове!',
            'quote_6': '...а сидели мы в молочном баре «Korova», шевеля mozgoi насчет того, куда бы убить вечер – подлый такой, холодный и сумрачный зимний вечер, хотя и сухой...',
            'line_first': '– Ну, что же теперь, а?',
            'line_last': 'И всякий прочий kal.',
            'classificatory': {
                'genre': 'Фантастика',
                'genre_code': 'distop',
                'general': 'Социальное | Психологическое',
                'place': 'Наш мир (Земля)',
                'time': '20 век',
                'plot': 'Становление/взросление героя',
                'line': 'Линейный',
                'age': 'Только для взрослых ',
            },
            'similars': [
                'Чак Паланик «Бойцовский клуб»',
                'Джордж Оруэлл «1984»',
                'Уильям Голдинг «Повелитель мух»',
            ],
            'films': [
                '«XXXXXXXX XXXXXXXX» 1971, США, Великобритания, реж: Стэнли Кубрик'
            ],
        },
        '39': {
            'id': '144918',
            'author': 'Александр Пушкин',
            'title': 'Евгений Онегин',
            'year': '1833',
            'translator': '',
            'quote_1': 'Зима!.. Крестьянин, торжествуя,<br> На дровнях обновляет путь;<br> Его лошадка, снег почуя,<br> Плетётся рысью как-нибудь;',
            'quote_2': 'Они сошлись. Волна и камень,<br> Стихи и проза, лед и пламень<br> Не столь различны меж собой.',
            'quote_3': 'Чем меньше женщину мы любим,<br> Тем легче нравимся мы ей<br> И тем её вернее губим <br> Средь обольстительных сетей.',
            'quote_4': 'Мы все учились понемногу<br> Чему-нибудь и как-нибудь,<br> Так воспитаньем, слава богу,<br> У нас немудрено блеснуть.',
            'quote_5': 'Я к вам пишу — чего же боле?<br> Что я могу еще сказать?<br> Теперь, я знаю, в вашей воле<br> Меня презреньем наказать.',
            'quote_6': 'Мой дядя самых честных правил,<br> Когда не в шутку занемог,<br> Он уважать себя заставил<br> И лучше выдумать не мог.',
            'line_first': 'He мысля гордый свет забавить,<br> Вниманье дружбы возлюбя,<br> Хотел бы я тебе представить<br> Залог достойнее тебя,',
            'line_last': 'Блажен, кто праздник жизни рано<br> Оставил, не допив до дна<br> Бокала полного вина,<br> Кто не дочел ее романа<br> И вдруг умел расстаться с ним,<br> Как я с Онегиным моим.',
            'classificatory': {
                'genre': 'Реализм',
                'genre_code': 'classic',
                'general': 'Психологическое | Социальное',
                'place': 'Россия',
                'time': 'Начало 19 века',
                'plot': 'Становление/взросление героя',
                'line': 'Линейный с экскурсами',
                'age': 'Любой',
            },
            'similars': [
                'Михаил Лермонтов «Герой нашего времени»',
                'Александр Пушкин «Дубровский»',
                'Джордж Гордон Байрон «Беппо»',
            ],
            'films': [
                '«XXXXXX» 2024, Россия, реж: Сарик Андреасян',
            ],
        },
        '40': {
            'id': '238538',
            'author': 'Агата Кристи',
            'title': 'Десять негритят',
            'year': '1939',
            'translator': 'Екимова Н.В.',
            'quote_1': '— Спокойной ночи, господа, — мрачно сказал судья. — Хотелось бы завтра встретиться в том же составе.',
            'quote_2': 'Осмотр острова был практически завершен. Троица снова стояла на самой высокой точке, глядя в сторону берега. Море было пусто. Ветер крепчал.',
            'quote_3': 'Вернув трубу на место, он опустил иглу на пластинку, и тут же все услышали снова:\n– Против вас выдвигаются обвинения…',
            'quote_4': 'Я вскрикнул, наклонился над краем утеса и сказал, что вижу нечто, похожее на лаз в пещеру. Он тут же наклонился вслед за мною. Резкий толчок, он потерял равновесие и с плеском обрушился в море.',
            'quote_5': 'Он смотрел на подставку с фарфоровыми фигурками. И бормотал себе под нос: – Вот чудно-то! Готов поклясться, что их было десять.',
            'quote_6': 'Последний негритенок, вздыхая тяжело,<br>Пошел, повесился – и вот не стало никого.',
            'line_first': 'В вагоне первого класса для курящих судья Уоргрейв – недавно в отставке – сидел в уютном уголке и, попыхивая сигарой, с интересом просматривал политические новости в «Таймс».',
            'line_last': 'Когда море успокоится, с берега придут лодки. Прибывшие на них люди найдут на Негритянском острове десять мертвецов – и неразрешимую загадку.',
            'classificatory': {
                'genre': 'Детектив | Триллер',
                'genre_code': 'detective',
                'general': 'Психологическое',
                'place': 'Великобритания',
                'time': 'Конец 1930-х годов',
                'plot': '',
                'line': 'Линейный с экскурсами',
                'age': 'Любой',
            },
            'similars': [
                'Филип Дик «Лабиринт смерти»',
                'Александр Юдин «Чики-чик»',
                'Артур Конан Дойл «Собака Баскервилей»',
            ],
            'films': [
                '«И не осталось никого» 1945, США, реж: Рене Клер',
                '«XXXXXX XXXXXXXX» 1987, СССР, реж: Станислав Говорухин',
                '«Мистерия» 1965, Индия, реж: Раджа Навате',
            ],
        },
        '41': {
            'id': '271793',
            'author': 'Алан Милн',
            'title': 'Винни-Пух',
            'year': '1926',
            'translator': 'Заходер Б.В.',
            'quote_1': 'И вдруг, откуда ни возьмись, пришли Дикие Буки, обитающие на Восточном Полюсе...',
            'quote_2': 'Так вот, первым делом надо подумать о том, что любят Слонопотамы.',
            'quote_3': 'И, конечно, он страшно обрадовался, увидев, что Кролик достаёт чашки и тарелки.',
            'quote_4': 'Наступило недолгое молчание. Крошка Ру свалился в очередную мышиную нору.',
            'quote_5': 'Потом он ещё подумал-подумал и сказал про себя: «А зачем на свете пчёлы? Для того, чтобы делать мёд! По-моему, так!»',
            'quote_6': '— Здорово выходит! — закричал Иа-Иа. — Входит и выходит — прямо замечательно!',
            'line_first': 'Ну вот, перед вами Ви́нни-Пух.',
            'line_last': 'Но куда бы они ни пришли и что бы ни случилось с ними по дороге, — здесь в Зачарованном Месте на вершине холма в Лесу, маленький мальчик будет всегда, всегда играть со своим медвежонком.',
            'classificatory': {
                'genre': 'Сказка/Притча',
                'genre_code': 'child',
                'general': 'Приключенческое | Юмористическое',
                'place': 'Наш мир (Земля)',
                'time': 'Неопределённое время действия',
                'plot': '',
                'line': 'Линейно-параллельный',
                'age': 'Детская литература',
            },
            'similars': [
                'Кеннет Грэм «Ветер в ивах»',
                'Джоэль Харрис «Сказки дядюшки Римуса»',
                'Сергей Григорьевич Козлов «Про Ёжика и его друзей»',
            ],
            'films': [
                '«XXXXX XXX» 1969, СССР, реж: Фёдор Хитрук',
                '«XXXXX XXX идёт в гости» 1971, СССР, реж: Фёдор Хитрук',
                '«XXXXX XXX и день забот» 1972, СССР, реж: Фёдор Хитрук, Геннадий Сокольский',
            ],
        },
        '42': {
            'id': '238543',
            'author': 'Михаил Лермонтов',
            'title': 'Герой нашего времени',
            'year': '1840',
            'translator': '',
            'quote_1': 'Клянусь, ты будешь владеть конем; только за него ты должен отдать мне сестру Бэлу: Карагёз будет ее калымом.',
            'quote_2': 'Максим Максимыч имел глубокие сведения в поваренном искусстве: он удивительно хорошо зажарил фазана, удачно полил его огуречным рассолом, и я должен признаться, что без него пришлось бы остаться на сухоядении.',
            'quote_3': 'И зачем было судьбе кинуть меня в мирный круг честных контрабандистов?',
            'quote_4': 'После всего этого как бы, кажется, не сделаться фаталистом?',
            'quote_5': 'Пойду к Елисаветинскому источнику: там, говорят, утром собирается все водяное общество.',
            'quote_6': '– Его звали… Григорьем Александровичем Печориным.',
            'line_first': 'Я ехал на перекладных из Тифлиса.',
            'line_last': 'Больше я от него ничего не мог добиться: он вообще не любит метафизических прений.',
            'classificatory': {
                'genre': 'Реализм',
                'genre_code': 'classic',
                'general': 'Психологическое | Приключенческое',
                'place': 'Наш мир (Земля)',
                'time': 'Новое время (17-19 века)',
                'plot': 'Становление/взросление героя',
                'line': 'Линейно-параллельный',
                'age': 'Любой',
            },
            'similars': [
                'Александр Пушкин «Евгений Онегин»',
                'Виктор Глебов «Фаталист»',
                'Джордж Гордон Байрон «Паломничество Чайльд-Гарольда»',
            ],
            'films': [
            ],
        },
        '43': {
            'id': '560',
            'author': 'Аркадий и Борис Стругацкие',
            'title': 'Понедельник начинается в субботу',
            'year': '1965',
            'translator': '',
            'quote_1': 'В отделе Вечной Молодости после долгой и продолжительной болезни скончалась модель бессмертного человека.',
            'quote_2': '— Боюсь я, батюшка, что ты зубом цыкать станешь, — сказала она с беспокойством.',
            'quote_3': 'На правой воротине сверху висела ржавая жестяная табличка: «Ул. Лукоморье, д. № 13, Н. К. Горыныч»',
            'quote_4': 'Есть А-Янус Полуэктович и У-Янус Полуэктович. У-Янус — это крупный учёный международного класса. Что же касается А-Януса, то это довольно обыкновенный администратор.',
            'quote_5': 'Сюда пришли люди, которым было приятнее быть друг с другом, чем порознь, которые терпеть не могли всякого рода воскресений, потому что в воскресенье им было скучно. Маги, Люди с большой буквы, и девизом их было...',
            'quote_6': 'Я затормозил возле странного здания с вывеской «НИИЧАВО» между окнами.',
            'line_first': 'Я приближался к месту моего назначения. Вокруг меня, прижимаясь к самой дороге, зеленел лес, изредка уступая место полянам, поросшим жёлтой осокою.',
            'line_last': 'Но это уже совсем-совсем другая история.',
            'classificatory': {
                'genre': 'Фантастика',
                'genre_code': '',
                'general': 'Юмористическое | Сатирическое',
                'place': 'Земля',
                'time': '20 век',
                'plot': 'Изобретения и научные исследования | Фантастические существа',
                'line': 'Линейный',
                'age': 'Любой',
            },
            'similars': [
                'Клиффорд Саймак «Заповедник гоблинов»',
                'Анна Коростелёва «Школа в Кармартене»',
                'Сергей Лукьяненко «Ночной Дозор»',
            ],
            'films': [
                '«Этот фантастический мир. Выпуск 1» 1979, СССР',
            ],
        },
        '44': {
            'id': '15230',
            'author': 'Михаил Булгаков',
            'title': 'Собачье сердце (Чудовищная история)',
            'year': '1968',
            'translator': '',
            'quote_1': 'Водки мне, конечно, не жаль, тем более, что она и не моя, а Филиппа Филипповича. Просто — это вредно. Это — раз, а второе — вы и без водки держите себя неприлично.',
            'quote_2': 'На узком операционном столе лежал, раскинувшись, пёс Шарик и голова его беспомощно колотилась о белую клеёнчатую подушку.',
            'quote_3': 'Абыр-абыр… Абырвалг!',
            'quote_4': '– Мы – новое домоуправление нашего дома, – в сдержанной ярости заговорил чёрный. – Я – Швондер, она – Вяземская, он – товарищ Пеструхин и Шаровкин. И вот мы…',
            'quote_5': 'Если вы заботитесь о своём пищеварении, мой добрый совет – не говорите за обедом о большевизме и о медицине. И – боже вас сохрани – не читайте до обеда советских газет.',
            'quote_6': 'Что такое эта ваша разруха? Старуха с клюкой? Ведьма, которая выбила все стекла, потушила все лампы? Да её вовсе и не существует.',
            'line_first': 'У-у-у-у-у-гу-гуг-гуу! О, гляньте на меня, я погибаю. Вьюга в подворотне ревёт мне отходную, и я вою с ней. Пропал я, пропал.',
            'line_last': '– «К берегам священным Нила…»',
            'classificatory': {
                'genre': 'Фантастика',
                'genre_code': 'scifi',
                'general': 'Социальное | Сатирическое',
                'place': 'Наш мир (Земля)',
                'time': '20 век',
                'plot': 'Изобретения и научные исследования',
                'line': 'Линейный',
                'age': 'Любой',
            },
            'similars': [
                'Герберт Уэллс «Остров доктора Моро»',
                'Дэниел Киз «Цветы для Элджернона»',
                'Мэри Шелли «Франкенштейн, или Современный Прометей»',
            ],
            'films': [
                ' «XXXXXXX XXXXXX» 1988, СССР, реж: Владимир Бортко',
            ],
        },
        '45': {
            'id': '52179',
            'author': 'Дэниел Киз',
            'title': 'Цветы для Элджернона',
            'year': '1959',
            'translator': 'Шаров С.Н.',
            'quote_1': 'Они отыскали мою сестру Норму каторая жывет с моей мамой в бруклине и она дала разрешение на апирацыю.',
            'quote_2': 'Вся пекарня пришла севодня посмотреть как я начал работать на тестосмесителе.',
            'quote_3': 'Я толкнул дверь и замер: стоя перед мольбертом, что-то рисовала стройная блондинка в розовом лифчике и трусиках',
            'quote_4': 'В этот момент щелкнул какой-то переключатель, и я увидел всю сцену из дверного проема, и себя в том числе — рядом с уставленными бокалами подносом, широко раскрывшего испуганные глаза.',
            'quote_5': 'На верно я умнею если выигрываю у такой умной мышы но я этово не чуствую. Я хотел ещо пасаривнаваца но Барт сказал хватит на севодня.',
            'quote_6': '...результатом хирургического стимулирования, которому мы оба подверглись, явилась интенсификация и ускорение процессов мышления, изъян, который я взял на себя смелость назвать эффектом Элджернона — Гордона...',
            'line_first': 'Док Штраус сказал што я должен писать все што я думаю и помню и все што случаеца со мной с севодня',
            'line_last': 'P.S. Пожалуста если с можите положыте на могилку цветы для Элджернона. На заднем дворе.',
            'classificatory': {
                'genre': 'Фантастика',
                'genre_code': 'scifi',
                'general': 'Психологическое | Философское',
                'place': 'Наш мир (Земля)',
                'time': '20 век',
                'plot': 'Становление/взросление героя',
                'line': 'Линейный',
                'age': 'Любой',
            },
            'similars': [
                'Тед Чан «Понимай»',
                'Север Гансовский «Пробуждение»',
                'Михаил Булгаков «Собачье сердце (Чудовищная история)»',
            ],
            'films': [
            ],
        },
        '46': {
            'id': '18413',
            'author': 'Чак Паланик',
            'title': 'Бойцовский клуб',
            'year': '1996',
            'translator': 'Кормильцев И.В.',
            'quote_1': 'Лёд покрывает пол пещеры, и пингвин командует мне: «Скользи!».',
            'quote_2': 'Возможно, самосовершенствование — это ещё не все. Возможно, саморазрушение гораздо важнее.',
            'quote_3': 'Бессонница — это очень серьезно. Все вокруг кажется таким далеким, копией, снятой с копии, сделанной с еще одной копии.',
            'quote_4': 'Вчера вечером я позвонил Марле. Мы договорились с ней, что перед тем, как пойти в группу поддержки, мы созваниваемся, чтобы не столкнуться на месте нос к носу.',
            'quote_5': 'Тайлер наверняка знает, но первое правило «Проекта Разгром» гласит: не задавать вопросов, касающихся «Проекта Разгром».',
            'quote_6': 'Второе правило бойцовского клуба гласит: никому никогда не рассказывать о бойцовском клубе.',
            'line_first': 'То этот Тайлер устраивает меня на работу официантом, то пихает мне ствол в рот и заявляет, что для того, чтобы обрести жизнь вечную, надо сначала умереть.',
            'line_last': '— Мы с нетерпением ожидаем вашего возвращения.',
            'classificatory': {
                'genre': 'Триллер',
                'genre_code': '',
                'general': 'Психологическое | Социальное',
                'place': 'США',
                'time': '20 век',
                'plot': 'Становление/взросление героя',
                'line': 'Линейный с экскурсами',
                'age': 'Только для взрослых',
            },
            'similars': [
                'Энтони Бёрджесс «Заводной апельсин»',
                'Филип Дик «Помутнение»',
                'Деннис Лихэйн «Остров проклятых»',
            ],
            'films': [
                '«XXXXXXXXX XXXX» 1999, США, Германия, реж: Дэвид Финчер',
            ],
        },
    }
}
