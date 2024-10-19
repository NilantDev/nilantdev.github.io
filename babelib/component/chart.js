const Chart = {
    template: `
        <div class="chart" id="chart">
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
            },
            sum: 0
        }
    },
    props: ['charts'],
    mounted() {
        for (const [key, value] of Object.entries(this.charts)) {
            this.sum += parseInt(value);
        }
    },
    methods: {
        getChartLabel(key) {
            let value = this.charts[key];
            let percent = parseInt(100 * parseInt(value) / this.sum);

            return this.chartLabels[key] + ' (' + percent + '%)';
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