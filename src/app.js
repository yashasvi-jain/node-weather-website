const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/gecode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Yashasvi Jain'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Yashasvi Jain'
    })
})

app.get('/weather', (req, res) => {
   const address = req.query.address
    if(!address)
    {
        return res.send({
            error: 'PLease provide an address.'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData
            })
        })
    })
    
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Yashasvi Jain'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yashasvi Jain',
        errorMessage: 'Help Service not found!'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yashasvi Jain',
        errorMessage: 'Page not found!'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})