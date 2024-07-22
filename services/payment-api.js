exports.makePayment = async (totalPayment, creditCardNumber, cardExpiryDate, cvc) => {
    try {
        var string = totalPayment.toString() + creditCardNumber.toString();
        return {
            paymentID: btoa(string),
        }
    }
    catch(exception) {
        throw(exception);
    }
}