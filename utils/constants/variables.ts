import { formatDate } from "../formats/date";

export const TODAY = formatDate(new Date().toISOString(), "yyyy/MM/dd", '-')
export const ONE_HOUR_MILL =  60 * 60 * 1000;
export const ONE_MINUTE_MILL =  60 * 1000;
export const FIVE_MINUTE_MILL =  60 * 1000;

export const SMALL_SCREEN_WIDTH =  600;

export const PASTEL_COLORS = [
    "#f6ccd5", "#c1c1de", "#c7daeb", "#d1e6d6", "#f2efd5", "#f0e0d1", "#b2d3db", "#a19dc4", "#e8b5d6", "#fcc", "#ffe7cf", "#b6c7a7"
]