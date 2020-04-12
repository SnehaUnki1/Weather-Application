const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // creates an express aplication

app.get('',(req, res) => {

    res.send("Hello Express")
})


app.get('/help',(req, res) => {

    res.send("Help Express")
})

app.get('/about',(req, res) => {

    res.send("<h1>About Express</h1>")
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide Address'
        })
    }

    
    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error})
        }
         forecast(latitude,longitude,(error,forecastData)=>{

            if (error){
                return res.send({error})
             }

             res.send({
                 forecast : forecastData,
                 location,
                 address : req.query.address
             })

         })
    })

    // res.send({
    //     'forecast' : 'It is sunny',
    //     'location' : 'Bangalur'
    // })
})

app.listen(3000,() =>{
    console.log('Server is UP')
})