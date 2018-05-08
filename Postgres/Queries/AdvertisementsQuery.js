const Promise = require('bluebird')
const { promisify } = Promise
const pool = require('../db_connect')
const uuid = require('uuid')

// to run a query we just pass it to the pool
// after we're done nothing has to be taken care of
// we don't have to return any client to the pool or close a connection
const query = promisify(pool.query)

exports.get_ad_from_session = (session_id) => {
  const p = new Promise((res, rej) => {
    const values = [session_id]

    const get_ad = `SELECT a.ad_id, a.ad_title, c.gps_x, c.gps_y, c.formatted_address, c.ad_address
                      FROM advertisements a
                      INNER JOIN chat_session_ad b
                      ON a.ad_id = b.ad_id
                      INNER JOIN (
                        SELECT address_id, gps_x, gps_y, formatted_address,
                               CONCAT(street_code, ' ', street_name, ', ', city) AS ad_address
                          FROM address
                      ) c
                      ON a.addess_id = c.address_id
                      WHERE b.session_id = $1
                    `

    query(get_ad, values, (err, results) => {
      if (err) {
        console.log(err)
        rej('Failed to get ad from session')
      }
      res(results.rows[0])
    })
  })
  return p
}
