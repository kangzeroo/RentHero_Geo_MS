const axios = require('axios')
const get_ad_from_session = require('../Postgres/Queries/AdvertisementsQuery').get_ad_from_session

exports.get_nearby_parking = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=parking&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} parking near by ${ad.ad_title}.`
      } else {
        response = `There are no parking in a 2.5 km radius :(`
      }
      res.json({
        fulfillmentText: response,
        fulfillmentMessages: [],
        outputContexts: [],
        payload: {
          type: 'locations',
          results: results,
          text: response,
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.get_nearby_gas_station = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=gas_station&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} gas stations near by ${ad.ad_title}.`
      } else {
        response = `There are no gas stations in a 2.5 km radius :(`
      }
      res.json({
        fulfillmentText: response,
        fulfillmentMessages: [],
        outputContexts: [],
        payload: {
          type: 'locations',
          results: results,
          text: response,
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
