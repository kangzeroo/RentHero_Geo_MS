const axios = require('axios')
const URL_basic_elastic_dialog_map = require('./mapping_locations').getMaps().URL_basic_elastic_dialog_map
const URL_advanced_elastic_dialog_map = require('./mapping_locations').getMaps().URL_advanced_elastic_dialog_map
const URL_seeking_elastic_dialog_map = require('./mapping_locations').getMaps().URL_seeking_elastic_dialog_map
const headers = {
  headers: {

  }
}

exports.fetchAppropriateTagsForIntent = function(intentID, intentName){
  const p = new Promise((res, rej) => {
    console.log('============================')
    console.log(intentID)
    console.log(intentName)

    const x = [
      axios.get(URL_basic_elastic_dialog_map, headers),
      axios.get(URL_advanced_elastic_dialog_map, headers),
      axios.get(URL_seeking_elastic_dialog_map, headers),
    ]
    Promise.all(x)
      .then((data) => {
        let dialogFlow_relationships = []
        const mappings = data.map((d) => {
          return d.data
        }).forEach((mapping) => {
          dialogFlow_relationships = dialogFlow_relationships.concat(mapping.relationships)
        })
        console.log(dialogFlow_relationships)
        const found = dialogFlow_relationships.filter((rel) => {
                          // console.log(rel)
                          return rel.dialogFlow_intentID === intentID && rel.dialogFlow_intentName === intentName
                        })
        if (found && found.length > 0 && found[0] && found[0].typeForm_Tags && found[0].typeForm_Tags.length > 0) {
          res(found[0].typeForm_Tags)
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
