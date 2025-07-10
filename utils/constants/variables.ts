import { formatDate } from "../formats/date";

export const TODAY = formatDate(new Date().toISOString(), "yyyy/MM/dd", '-')