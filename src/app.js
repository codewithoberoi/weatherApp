//Express Doc: https://expressjs.com/en/4x/api.html 

//app.js starting point of our node js web server
//Load Express and configure it to serve something up.
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


const app = express();
const APP_PORT = 3000;

//Define Paths for Express Config.
const publicStaticPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve.
app.use(express.static(publicStaticPath))


// //What the server should do when someone call the configured url.
// //First argument routes, second argument is function.
// //This function contains 
// //req ~ Incoming request object. another is response to be sent back to requestor.
// app.get('', (req, res) => {
//     res.send('Hello Express!!!')
// })
/*
When we visited http://localhost:3000/ It went to our server. Express server found matching route above, and processed the request using handler.
*/

app.get('', (req, res) => {
    //Render allows us to render our views.
    res.render('index', {
        title: 'Weather App',
        name: 'Rajat Oberoi'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rajat Oberoi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Need Help?',
        title: "Help Section!",
        name: "Rajat Oberoi"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name: location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, {temperature, wind_speed} = {}) => {
            if(error) {
                return res.send({ error })
            }
            
            res.send({
                temperature: temperature,
                windSpeed: wind_speed,
                location: location
            })
        })
    })
})

app.get('/download', (req, res) => {
    res.download(path.join(__dirname, '../public/images/', 'op.jpeg'))
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Rajat Oberoi',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) =>{
    res.render('404', {
        title: '404 Page',
        name: 'Rajat Oberoi',
        errorMessage: 'Page Not Found!!'
    })
})

//Start the server. Listen method, callback function is optional.
app.listen(APP_PORT, () => {
    console.log(`App started listening on port ${APP_PORT}`)
})