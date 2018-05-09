const axios = require('axios')
const get_ad_from_session = require('../Postgres/Queries/AdvertisementsQuery').get_ad_from_session

exports.get_nearby_library = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=5000&type=library&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} libraries near by ${ad.ad_title}.\nThey are ${results.map((result) => `${result.name}\n`)}`
      } else {
        response = `There are no libraries in a 2.5 km radius :(`
      }
      res.json({
        fulfillmentText: response,
        fulfillmentMessages: [],
        outputContexts: [],
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.get_nearby_school = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      const params = info.queryResult.parameters.School.split(' ').join('+')
      console.log(params)
      console.log(info.queryResult.parameters)
      return axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${params}&location=${data.gps_x},${data.gps_y}&radius=5000&type=school&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} schools near by ${ad.ad_title}.\nThey are ${results.map((result) => `${result.name}\n`)}`
      } else {
        response = `There are no schools in a 2.5 km radius :(`
      }
      res.json({
        fulfillmentText: response,
        fulfillmentMessages: [],
        outputContexts: [],
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
