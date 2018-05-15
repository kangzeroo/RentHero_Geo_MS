const axios = require('axios')
const get_ad_from_session = require('../Postgres/Queries/AdvertisementsQuery').get_ad_from_session

exports.get_nearby_restaurants = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      console.log(data)
      ad = data
      console.log(info.queryResult.parameters.Food)
      return axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${info.queryResult.parameters.Food.toLowerCase().replace(' ', '+')}&location=${data.gps_x},${data.gps_y}&radius=1000&type=restaurant&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      const response = `There are ${results.length} restaurants for "${info.queryResult.parameters.Food}" close to ${ad.ad_title}`
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

exports.get_nearby_beauty_salon = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=5000&type=beauty_salon&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} beauty salons within walking distance of ${ad.ad_title}.`
      } else {
        response = `There are no ATMs in a 5 km radius :(`
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

exports.get_nearby_church = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=5000&type=church&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} churchs nearby ${ad.ad_title}.`
      } else {
        response = `There are no churches in a 5 km radius :(`
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

exports.get_nearby_hospital = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=5000&type=hospital&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} hospitals near by ${ad.ad_title}.`
      } else {
        response = `There are no hospitals in a 5 km radius :(`
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

exports.get_nearby_police = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=police&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} police stations near by ${ad.ad_title}.`
      } else {
        response = `There are no police stations in a 2.5 km radius :(`
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

exports.get_nearby_fire_station = function(req, res, next) {
  const info = req.body
  let ad

  get_ad_from_session(info.session.slice(req.body.session.indexOf('/sessions/') + '/sessions/'.length))
    .then((data) => {
      ad = data
      return axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data.gps_x},${data.gps_y}&radius=2500&type=fire_station&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    })
    .then((data) => {
      const results = data.data.results
      let response
      if (results && results.length > 0) {
        response = `There are ${results.length} fire stations near by ${ad.ad_title}.`
      } else {
        response = `There are no fire stations in a 2.5 km radius :(`
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





// SAMPLE RESPONSE
// {
//         "formatted_address": "280 Lester St Unit 105, Waterloo, ON N2L 3W5",
//         "geometry": {
//             "location": {
//                 "lat": 43.47558799999999,
//                 "lng": -80.53577299999999
//             },
//             "viewport": {
//                 "northeast": {
//                     "lat": 43.47689792989272,
//                     "lng": -80.53452127010728
//                 },
//                 "southwest": {
//                     "lat": 43.47419827010728,
//                     "lng": -80.53722092989273
//                 }
//             }
//         },
//         "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
//         "id": "6e03c3b81884d4ae6ca8e06670d77ea3f14c3280",
//         "name": "Watchtower Restaurant",
//         "opening_hours": {
//             "open_now": false,
//             "weekday_text": []
//         },
//         "photos": [
//             {
//                 "height": 624,
//                 "html_attributions": [
//                     "<a href=\"https://maps.google.com/maps/contrib/104481888504890964150/photos\">A Google User</a>"
//                 ],
//                 "photo_reference": "CmRaAAAA1uFq1LGzpc8URFfZ-gtHl1jfdrIxyVPfY9j9go4JHojpkG7LMA-zlBB1gsd9kG6EUBoUcctZsj5RBCtaa-Yyf21G9m0HRFEv-btEp3rS5sLXXy1vyeaPtnw9OIhL78pKEhCpcgEk-2InXNWUnw9sDTvNGhT1lDs56FiK775rqTZeCJwj-GvFPA",
//                 "width": 856
//             }
//         ],
//         "place_id": "ChIJAZxghvjzK4gRStwcRHeDQOI",
//         "rating": 4.5,
//         "reference": "CmRbAAAAjirwa54vPWtOabPzfryK_H3wlyaISWMlgqUOaI0JZAuzw4C8L-_jBUa0GDfdka4E4hO9v_KSu7VJVP1AWsR7E2n74Ilbd32g14KDKLLZF-oCkdLHoPd75Ml1kJSyxDVPEhAjfgv5TlBsuU8ggU5jSStrGhSm4KVeP81vf9711ePi2LNCnIF7JQ",
//         "types": [
//             "restaurant",
//             "food",
//             "point_of_interest",
//             "establishment"
//         ]
//     },
