exports.parseDate = (date) =>  {
    if(!date) {
        return null;
    }
    if (!date instanceof Date){
        return null;
    }
    if(!date.getFullYear || !date.getMonth || !date.getDate) {
        return null;
    }
    try {
        return date.toISOString().substr(0,10);
    }
    catch {
        return null;
    }
}