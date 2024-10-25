const Chart = {
    template: `
        <div class="chart" id="chart">
            <hr>
            <div class="bar" v-for="(value, key) in charts">
                <span class="label" v-text="getChartLabel(key)"></span>
                <span class="label" v-text="getChartBar(key)"></span>
            </div>
        </div>
    `,
    data() {
        return {
            chartLabels: {
                attempt_1: 'Попытка 1',
                attempt_2: 'Попытка 2',
                attempt_3: 'Попытка 3',
                attempt_4: 'Попытка 4',
                attempt_5: 'Попытка 5',
                attempt_6: 'Попытка 6',
                lost: 'Проигрыш'
            }
        }
    },
    props: ['charts'],
    methods: {
        getChartLabel(key) {
            let sum = 0;
            for (const [key, value] of Object.entries(this.charts)) {
                if (key != 'id') {
                    sum += parseInt(value);
                }
            }

            let value = this.charts[key];

            return this.chartLabels[key] + ' (' + value + ')';
        },
        getChartBar(key) {
            const maxEmojis = 10;
            const value = this.charts[key];

            const emojiCount = Math.round((value / Math.max(...Object.values(this.charts))) * maxEmojis);
            const emojis = '📙'.repeat(emojiCount);

            return emojis;
        }
    }
}