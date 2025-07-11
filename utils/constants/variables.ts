import { formatDate } from "../formats/date";

export const TODAY = formatDate(new Date().toISOString(), "yyyy/MM/dd", '-')
export const ONE_HOUR_MILL =  60 * 60 * 1000; // 1 hour in milliseconds
export const ONE_MINUTE_MILL =  60 * 1000; // 1 minute in milliseconds
export const FIVE_MINUTE_MILL =  60 * 1000; // 1 minute in milliseconds