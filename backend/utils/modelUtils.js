exports.compareDict = (intputDict, modelDict) => {
    for(var key in modelDict) {
        if(intputDict.hasOwnProperty(key)){
            if(intputDict[key].toString() !== modelDict[key].toString()) {
                return false;
            }
        }
    }
    return true;
}
