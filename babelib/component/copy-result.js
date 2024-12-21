const CopyResult = {
    template: `
        <div class="share-wrapper" style="text-align: center;" v-show="!canInput">
            <button @click="copyResult()">Скопировать результат</button>
            <chart-component :charts="charts"> </chart-component>
        </div>
    `,
    components: {
        'chart-component': Chart
    },
    props: ['canInput','isbn', 'taskId', 'charts'],
    methods: {
        copyResult() {
            let result = '';
            result = result + '—— Вавиленская библиотека ——\n';
            result = result + 'ISBN-' + this.isbn + '\n';
            const attempts =  getValueFromLocalStorage('attempts', this.taskId);
            attempts.forEach((element) =>  {
                let haveWon = false;

                if (element == 'won') {
                    result = result + '📖';
                    haveWon = true;
                }

                if (element && !haveWon) {
                    result = result + '📕';
                }
            });

            result = result + '\n\nhttps://nilantdev.github.io/';
            navigator.clipboard.writeText(result);

        },
    }
};