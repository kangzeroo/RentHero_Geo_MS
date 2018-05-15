const axios = require('axios')
const get_ad_from_session = require('../Postgres/Queries/AdvertisementsQuery').get_ad_from_session

exports.get_nearby_bank = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${info.queryResult.parameters.Bank.toLowerCase().replace(' ', '+')}&location=${data.gps_x},${data.gps_y}&radius=1000&type=bank&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} banks within walking distance of ${ad.ad_title}. They are ${results.map((result) => { return `${result.name}\n`})}`
      } else {
        response = `There are no banks in a 3 km radius :(`
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
