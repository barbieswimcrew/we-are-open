import 'https://unpkg.com/vue';

import { getOpeningHours } from "./openingHours.js";

let countryCode = 'de';
let locale = navigator.language;

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
            let time = this.nextChange.toLocaleTimeString(countryCode, {hour: '2-digit', minute: '2-digit'});

            let day = this.nextChange.getDay();

            if (day === new Date().getDay()) {
                day = 'heute';
            } else {
                day = 'am ' + this.nextChange.toLocaleDateString(countryCode, {weekday: 'long'});
            }

            return (this.isOpen)
                ? `Wir schließen ${day} um ${time} Uhr`
                : `Wir öffnen wieder ${day} um ${time} Uhr`;
        },
        getState: function() {
            return (this.isOpen)
                ? 'geöffnet'
                : 'geschlossen';
        },
        getNextChange() {
            let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

            return this.nextChange.toLocaleDateString(countryCode, options);
        }
    },
    watch: {
        now: function() {
            this.$forceUpdate();
        }
    }
});

let vm = new Vue({
    el: '#app',
    data: {
        isOpen: null,
        nextChange: null,
        now: null,
    },
    methods: {
        getValidator: function() {
            let openingHours = getOpeningHours();

            return new opening_hours(
                openingHours,
                {
                    'address': {
                        'country_code': countryCode
                    }
                }, {
                    'locale': locale
                }
            );
        }
    },
    mounted() {
        setInterval(() => {
            let validator = this.getValidator();
            this.isOpen = validator.getState();
            this.nextChange = validator.getNextChange();
            this.now = new Date().toLocaleString(countryCode) + ' Uhr';
        }, 1000);
    },
});
