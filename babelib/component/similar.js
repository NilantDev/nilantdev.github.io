const Similar = {
    template: `
    <div v-if="data.code == 'similars_films'">
                    <h3>Похожие произведения:</h3>
                    <ul id="similars">
                        <li v-for="similar in task.similars" v-text="similar"></li>
                    </ul>
                    <h3>Экранизации:</h3>
                    <ul id="films">
                        <li v-for="film in task.films" v-text="film"></li>
                    </ul>
                </div>
    `
};