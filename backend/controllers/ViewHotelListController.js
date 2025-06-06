const ascenda = require('../services/ascenda-api');
const {logger} = require('../utils/logger');

exports.retrieveHotelsList = async (req, res, next) => {
  try{
    const query = req.query;
    const data = await ascenda.retrieveAvailableHotels(query.destination_id, query.checkin, query.checkout, query.lang, 
      query.currency, query.country_code, query.guests, query.partner_id);
    res.send(data);
  }
  catch(err) {
    next(err);
  }
};

exports.retrieveAvailableHotelRooms = async (req, res, next) => {
  try{
    const query = req.query;
    const params = req.params;
    const data = await ascenda.retrieveAvailableHotelRooms(params.id, query.destination_id, query.checkin, query.checkout, query.lang, 
                  query.currency, query.country_code, query.guests, query.partner_id);
    res.send(data);
  }
  catch(err) {
    next(err);
  }
};

exports.retrieveHotelsByDestinationID = async (req, res, next) => {
  try{
    const query = req.query;
    const data = await ascenda.retrieveHotelsByDestinationID(query.destination_id);
    res.send(data);
  }
  catch(err) {
    next(err);
  }
};

exports.retrieveStaticHotelDetailByHotelID = async (req, res, next) => {
  try{
    const params = req.params;
    const data = await ascenda.retrieveStaticHotelDetailByHotelID(params.id);
    res.send(data);
  }
  catch(err) {
    next(err);
  }
};

