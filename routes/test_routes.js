const axios = require('axios')
// GET /test
exports.test = function(req, res, next){
  res.json({
    message: "Test says alive and well"
  })
}

exports.test_nearby = function(req, res, next) {
  const info = req.body
  let ad

    axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=food&location=${info.gps_x},${info.gps_y}&radius=2000&key=AIzaSyCh3Q0Z_1WFRpRrpNz-j1h81wp9EyuNuhg`)
    .then((data) => {
      const results = data.data.results
      res.json(results)
    })
    .catch((err) => {
      console.log(err)
    })
}
