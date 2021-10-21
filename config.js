// follows the OSM opening hours syntax specification
// @link https://wiki.openstreetmap.org/wiki/Key:opening_hours/specification
export const OPENING_HOURS = ''
    + 'Mo,Tu,Th,Fr 09:00-12:00,15:00-18:00,Sa 09:00-12:00;' // regular opening hours
    + 'PH closed;' // closed on public holidays
    + 'Dec 24-Feb Th[1] closed;' // closed in winter times from christmas until first thursday in february
    + 'Oct Mo[3] closed "Kirchweihmontag";' // church fair every third monday in october

export const COUNTRY_CODE = 'de';
export const LOCALE = navigator.language;