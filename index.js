var express = require('express')
var mongoose = require('mongoose')
var userModel = require('./model/user.js')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/newdb") //connect to db

var db = mongoose.connection

//conn check
db.on('error', function () {
    console.log('Error')
})

db.once('open', function () {
    console.log("CONNECTED")
})


app.get('/', function (req, res) {
    res.send("Hello from Express Rest Api")
})

app.get('/getall', function (req, res) {
    userModel.find({}, function (err, data) {
        if (err) {
            res.send("Error: " + err)
        } else {
            res.json(data)
        }
    })
})

app.get('/get/:location', function (req, res) {
    var pathParam = req.params.location
    userModel.find({location:pathParam},function (err, data) {
        if (err) {
            res.send("Error: " + err)
        } else {
            res.json(data)
        }
    })
})

app.delete('/delete/:location', function (req, res) {
        userModel.findByIdAndRemove((req.params.location),function (err) {
            if(err) {
              throw err
            }else{
            console.log("deleted")
            }
        })
})

app.post('/add',function(req,res){
    var uM = new userModel()
    uM.name=req.body.name
    uM.location=req.body.location
    uM.year=req.body.year
    uM.save(function(err){
       if(err){
           res.send(err)
       }else{
           res.json({"message":"user created"})
       }
   })
})

app.listen(3030)