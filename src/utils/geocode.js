const request = require('request')
//Find the latitude and longitude of a place using callback funcion

const geocode = (address,callback) => {

    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +".json?access_token=pk.eyJ1Ijoic25laGFyYXZpIiwiYSI6ImNrOGNza3doZzBtdDYzZG5zMDdmYW9kdGgifQ.hf0YD9zDtofaKB507wOSsw"
    console.log(geocodeURL)
    request({url:geocodeURL, json:true},(error,{body}) =>{
   // request({url:geocodeURL, json:true},(error, response) =>{
        if(error){
            callback("Unable to COnnect loction services!!!",undefined)
        } else if(body.features.length === 0){
            callback("Unable to Find the location for given data!!",undefined)
        } else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
      
            })
            
        }
        
    })

}

module.exports = geocode
