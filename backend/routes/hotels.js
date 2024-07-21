const router = require('express').Router();
const ViewHotelListController = require("../controllers/ViewHotelListController") 

router.get('/hotels/:id/price', ViewHotelListController.retrieveAvailableHotelRooms);

router.get('/hotels/prices', ViewHotelListController.retrieveHotelsList);

router.get('/hotels', ViewHotelListController.retrieveHotelsByDestinationID);

router.get('/hotels/:id', ViewHotelListController.retrieveStaticHotelDetailByHotelID);

module.exports = router;



