export function parseDate(date) {
    return  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}