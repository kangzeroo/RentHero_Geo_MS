// libraries
const bodyParser = require('body-parser')

// middleware
// const google_jwt_check = require('./auth/google_jwt_check').google_jwt_check
// const origin_check = require('./auth/origin_check').origin_check

// routes
const Test = require('./routes/test_routes')
const GeoRoutes = require('./routes/geo_routes')
const TransportationRoutes = require('./routes/transportation_routes')
const AutomotiveRoutes = require('./routes/automotive_routes')
const ShoppingRoutes = require('./routes/shopping_routes')
const EducationRoutes = require('./routes/education_routes')
const LeisureRoutes = require('./routes/leisure_routes')
const BankingRoutes = require('./routes/banking_routes')

// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})

module.exports = function(app){

	// routes
	app.get('/test', json_encoding, Test.test)
	app.post('/test_nearby', json_encoding, Test.test_nearby)

	// Geo Routes
	app.post('/get_nearby_restaurants', json_encoding, GeoRoutes.get_nearby_restaurants)
	app.post('/get_nearby_beauty_salon', json_encoding, GeoRoutes.get_nearby_beauty_salon)
	app.post('/get_nearby_church', json_encoding, GeoRoutes.get_nearby_church)
	app.post('/get_nearby_hospital', json_encoding, GeoRoutes.get_nearby_hospital)
	app.post('/get_nearby_police', json_encoding, GeoRoutes.get_nearby_police)
	app.post('/get_nearby_fire_station', json_encoding, GeoRoutes.get_nearby_fire_station)

	// Transportation Routes
	app.post('/get_nearby_bus_station', json_encoding, TransportationRoutes.get_nearby_bus_station)
	app.post('/get_nearby_subway', json_encoding, TransportationRoutes.get_nearby_subway)
	app.post('/get_nearby_airport', json_encoding, TransportationRoutes.get_nearby_airport)
	app.post('/get_nearby_transit_station', json_encoding, TransportationRoutes.get_nearby_transit_station)
	app.post('/get_nearby_train_station', json_encoding, TransportationRoutes.get_nearby_train_station)

	// Automotive Routes
	app.post('/get_nearby_parking', json_encoding, AutomotiveRoutes.get_nearby_parking)
	app.post('/get_nearby_gas_station', json_encoding, AutomotiveRoutes.get_nearby_gas_station)

	// Shopping Routes
	app.post('/get_nearby_convenience_store', json_encoding, ShoppingRoutes.get_nearby_convenience_store)
	app.post('/get_nearby_liquor_store', json_encoding, ShoppingRoutes.get_nearby_liquor_store)
	app.post('/get_nearby_hardware_store', json_encoding, ShoppingRoutes.get_nearby_hardware_store)
	app.post('/get_nearby_store', json_encoding, ShoppingRoutes.get_nearby_store)
	app.post('/get_nearby_supermarket', json_encoding, ShoppingRoutes.get_nearby_supermarket)

	// Education Routes
	app.post('/get_nearby_library', json_encoding, EducationRoutes.get_nearby_library)
	app.post('/get_nearby_school', json_encoding, EducationRoutes.get_nearby_school)

	// Leisure Routes
	app.post('/get_nearby_bar', json_encoding, LeisureRoutes.get_nearby_bar)
	app.post('/get_nearby_park', json_encoding, LeisureRoutes.get_nearby_park)
	app.post('/get_nearby_night_club', json_encoding, LeisureRoutes.get_nearby_night_club)

	// Banking Routes
	app.post('/get_nearby_atm', json_encoding, BankingRoutes.get_nearby_atm)
	app.post('/get_nearby_bank', json_encoding, BankingRoutes.get_nearby_bank)

}
