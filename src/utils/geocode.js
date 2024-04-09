const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFqYXRvYmVyb2kiLCJhIjoiY2wxajh6ajRoMHJveTNqbjNkaGxuaTc5YiJ9.aBcM7_x9xwl_Z_WAE-Zibg`

    const apiOpts = {
        url: url,
        rejectUnauthorized: false,
        json: true
    }

    request(apiOpts, (error, {body}) => {
        if(error) {
            //Making geocode flexible so that caller in it's callback can choose what needs to be done with error message. whether needs console or writing in file or send error email notification.
            callback('Unable to connect to geocode.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;