const ascenda = require('../services/ascenda-api');
const {logger} = require('../utils/logger');

exports.retrieveHotelsList = async (req, res, next) => {
  try{
    const query = req.query;
    ascenda.retrieveAvailableHotels(query.destination_id, query.checkin, query.checkout, query.lang, 
      query.currency, query.country_code, query.guests, query.partner_id).then(data => {
        res.send(data);
      })
  }
  catch(err) {
    next(err);
  }
};

exports.retrieveAvailableHotelRooms = async (req, res, next) => {
  try{
    const query = req.query;
    const params = req.params;
    ascenda.retrieveAvailableHotelRooms(params.id, query.destination_id, query.checkin, query.checkout, query.lang, 
      query.currency, query.country_code, query.guests, query.partner_id).then(data => {
        res.send(data);
      })
  }
  catch(err) {
    next(err);
  }
};

exports.retrieveHotelsByDestinationID = async (req, res, next) => {
  try{
    const query = req.query;
    ascenda.retrieveHotelsByDestinationID(query.destination_id).then(data => {
        res.send(data);
      })
  }
  catch(err) {
    next(err);
  }
};

exports.retrieveStaticHotelDetailByHotelID = async (req, res, next) => {
  try{
    const params = req.params;
    ascenda.retrieveStaticHotelDetailByHotelID(params.id).then(data => {
        res.send(data);
      })
  }
  catch(err) {
    next(err);
  }
};
