import 'https://unpkg.com/vue';

import { COUNTRY_CODE, LOCALE, OPENING_HOURS } from "./config.js";

Vue.component('status', {
    props: {
        isOpen: Boolean,
        nextChange: Date,
        now: String,
    },
    name: 'Status',
    template: `
            <div v-if="isOpen !== null && nextChange !== null">
            <h1>{{ getState() }}</h1>
            <h2>{{ getNext() }}</h2>
            <h3>{{ now }}</h3>
            </div>`,
    methods: {
        getNext() {
            console.log(this.nextChange);
            let time = this.nextChange.toLocaleTimeString(COUNTRY_CODE, {hour: '2-digit', minute: '2-digit'});

            let day = this.nextChange.getDay();

            if (day === new Date().getDay()) {
                day = 'heute';
            } else {
                day = 'am ' + this.nextChange.toLocaleDateString(COUNTRY_CODE, {weekday: 'long'});
            }

            return (this.isOpen)
                ? `Wir schließen um ${time} Uhr`
                : `Wir öffnen ${day} um ${time} Uhr`;
        },
        getState: function() {
            return (this.isOpen)
                ? 'geöffnet'
                : 'geschlossen';
        }
    },
    watch: {
        now: function() {
            this.$forceUpdate();
        }
    }
});

new Vue({
    el: '#app',
    data: {
        isOpen: null,
        nextChange: null,
        now: null,
    },
    methods: {
        setBodyClass: function() {
            if (this.isOpen) {
                document.body.classList.add('open');
            } else {
                document.body.classList.remove('open');
            }
        },
        createValidator: function() {
            return new opening_hours(
                OPENING_HOURS,
                {
                    'address': {
                        'country_code': COUNTRY_CODE
                    }
                }, {
                    'locale': LOCALE
                }
            );
        }
    },
    mounted() {
        setInterval(() => {
            let validator = this.createValidator();
            this.isOpen = validator.getState();
            this.nextChange = validator.getNextChange();
            this.now = new Date().toLocaleString(COUNTRY_CODE) + ' Uhr';
            this.setBodyClass();
        }, 1000);
    },
    template: `<div id="app"><status :is-open="isOpen" :next-change="nextChange" :now="now"></status></div>`
});
