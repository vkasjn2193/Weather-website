//video 58,59 udemy
const path     = require('path')
const express  = require('express')
const hbs      = require('hbs')

const geocode  = require('./utils/geocode4')
const forecast = require('./utils/forecast4')

const app      = express()
const port=process.env.PORT || 3000
//define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')//public
const viewPath            = path.join(__dirname, '../templates/views') //templates 
const partialsPath        = path.join(__dirname, '../templates/partials')//partials

//setup handlers engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'vikas from index '
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'vikas from about page'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        titlehelp: 'this is some helpful text',
        title:'Help',
        name:'vikas from help page'
    })
})
app.get('/Weather', (req, res) => {
    if(!req.query.address){
        return   res.send({
            error:'you must provide a address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
     return   res.send({
            error:'You Must Provide A Search '
        })
    }
  
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=> {
    
//res.send('Help article not found')
 res.render('404',{
    title:'404',
    name:'vikas from help/*',
    ErrorMessage:'Help article nt found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'vikas from 404',
        ErrorMessage:'Page not found.'
    })
})
app.listen(port, () => {
    console.log('server is up on port '+ port)
})