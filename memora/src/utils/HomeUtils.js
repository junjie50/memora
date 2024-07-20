export function formatGuest(room, adults, child) {
    var base = Math.floor((adults + child) / room);
    var additional = (adults + child) % room;
    var result = "";
    while(room > 0) {
        if(additional > 0) {
            result += (base + 1).toString() + "|";
            additional -= 1;
        }
        else {
            result += base.toString() + "|";
        }
    
        room -= 1;
    }
    return result.substring(0, result.length - 1);
}