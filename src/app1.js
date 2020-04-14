const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Set up Express path configuration
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const partialspath = path.join(__dirname,'../templates/partials')

//Set up handler engine and viewa location.
// by default express look for views folder.
app.set('view engine', 'hbs')

//Setup static directory to serve apllication
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialspath)

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

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sneha Ravi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Developer',
        name: 'Sneha Ravi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Application',
        help: 'We aer here to help u',
        name:'Sneha Ravi'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Sneha Ravi',
        errorMessage:'page not found'
    })
})

app.get('help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Sneha Ravi',
        errorMessage:'Help artcle not found'
    })
})
// const express = require("express")
// const path = require("path")

// const app = express()
// const directory = path.join(__dirname, '../public')

// app.set('viwe engine','hbs')
// app.use(express.static(directory))

// app.get('',(req, res) => {
//     res.render('index',{
//         title : "Weather Application",
//         name : "Advik"
//     })
// })

app.listen(port,() =>{
    console.log('Server is UP listening to '+ port)
})