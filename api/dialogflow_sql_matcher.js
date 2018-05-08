const axios = require('axios')
// const dialogflow_sql_match_map = require('./mappings_reference/dialogflow_sql_match/js/dialogflow_sql_match_map').dialogflow_sql_match_map
const URL_dialogflow_sql_match_map = require('./mapping_locations').getMaps().URL_dialogflow_sql_match_map
const headers = {
  headers: {

  }
}

exports.fetchAppropriateRDSQueryForIntent = function(intentID, intentName){
  const p = new Promise((res, rej) => {
    console.log('============================')
    console.log(intentID)
    axios.get(URL_dialogflow_sql_match_map, headers)
      .then((dialogFlow_relationships) => {
        const found = dialogFlow_relationships.data.relationships.filter((rel) => {
                          // console.log(rel)
                          return rel.dialogFlow_intentID === intentID && rel.dialogFlow_intentName === intentName
                        })
        console.log(found)
        if (found && found.length > 0 && found[0] && found[0].requiredSlots && found[0].rdsQuery) {
          // res(found[0])
          res('The specific sql answer is this... Jimmy please do a SQL query')
        } else {
          // console.log(found)
          rej('No answer found for this intent!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
  return p
}
