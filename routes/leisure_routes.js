const axios = require('axios')
const get_ad_from_session = require('../Postgres/Queries/AdvertisementsQuery').get_ad_from_session

exports.get_nearby_bar = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2000&type=bar&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} bars within 5kms of ${ad.ad_title}. \n They are ${results.map(result => `${result.name} \n`)}`
      } else {
        response = `There are no bars in a 2 km radius :(`
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

exports.get_nearby_movie_theatre = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=movie_theatre&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} movie theatres near by ${ad.ad_title}.`
      } else {
        response = `There are no movie theatres in a 2.5 km radius :(`
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

exports.get_nearby_park = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=park&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} parks near by ${ad.ad_title}.`
      } else {
        response = `There are no parks in a 2.5 km radius :(`
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

exports.get_nearby_night_club = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=night_club&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} night clubs near by ${ad.ad_title}. \n They are ${results.map(result => `${result.name} \n`)}`
      } else {
        response = `There are no night clubs in a 2.5 km radius :(`
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
