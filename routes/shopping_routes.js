const axios = require('axios')
const get_ad_from_session = require('../Postgres/Queries/AdvertisementsQuery').get_ad_from_session

// exports.get_nearby_convenience_store = function(req, res, next) {
//   const info = req.body
//   let ad
//
//   get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
//     .then((data) => {
//       ad = data
//       return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=3000&type=convenience_store&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
//     })
//     .then((data) => {
//       const results = data.data.results
//       let response
//       if (results && results.length > 0) {
//         response = `There are ${results.length} convenience stores within walking distance of ${ad.ad_title}.`
//       } else {
//         response = `There are no convenience stores in a 3 km radius :(`
//       }
//       res.json({
//         fulfillmentText: response,
//         fulfillmentMessages: [],
//         outputContexts: [],
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
//
// exports.get_nearby_liquor_store = function(req, res, next) {
//   const info = req.body
//   let ad
//
//   get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
//     .then((data) => {
//       ad = data
//       return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=3000&type=liquor_store&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
//     })
//     .then((data) => {
//       const results = data.data.results
//       let response
//       if (results && results.length > 0) {
//         response = `There are ${results.length} liquor stores near by ${ad.ad_title}.`
//       } else {
//         response = `There are no liquor stores in a 5 km radius :(`
//       }
//       res.json({
//         fulfillmentText: response,
//         fulfillmentMessages: [],
//         outputContexts: [],
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
//
// exports.get_nearby_hardware_store = function(req, res, next) {
//   const info = req.body
//   let ad
//
//   get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
//     .then((data) => {
//       ad = data
//       return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=hardware_store&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
//     })
//     .then((data) => {
//       const results = data.data.results
//       let response
//       if (results && results.length > 0) {
//         response = `There are ${results.length} hardware stores near by ${ad.ad_title}.`
//       } else {
//         response = `There are no hardware stores in a 2.5 km radius :(`
//       }
//       res.json({
//         fulfillmentText: response,
//         fulfillmentMessages: [],
//         outputContexts: [],
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

exports.get_nearby_store = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${info.queryResult.parameters.Store.split(' ').join('+')}&location=${data.gps_x},${data.gps_y}&radius=2000&type=store&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} stores near by ${ad.ad_title}. They are ${results.map(result => `${result.name}\n`)}`
      } else {
        response = `There are no stores in a 5 km radius :(`
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

exports.get_nearby_mall = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${info.queryResult.parameters.Mall.split(' ').join('+')}&location=${data.gps_x},${data.gps_y}&radius=2000&type=shopping_mall&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} malls near by ${ad.ad_title}.\n They are ${results.map(result => `${result.name} \n`)}`
      } else {
        response = `There are no malls in a 2 km radius :(`
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
