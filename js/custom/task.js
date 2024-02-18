var Task = {
    getTodayTask: function(songs, lyrics, lang) {
        const date = new Date();
        // let dayOfWeek = date.getDay() == 0 ? 7 : date.getDay();
        // console.log(dayOfWeek);

        let dayOfWeek = date.getDate() - 19;

        let result = songs[lang][dayOfWeek];
        result['lyrics'] = lyrics[lang][dayOfWeek]['lyrics'].split('\n');;
    
        return result;
    }
}