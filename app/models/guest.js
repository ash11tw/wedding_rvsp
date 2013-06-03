/*
* @fileoverview Guest model.
*/


/**
* Module dependencies.
*/

var mongoose = require('mongoose')
  , Schema = mongoose.Schema


/**
* Schemas
*/

var GuestSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String},
  number: {type:Number},
  allergy: {type:String},
  pickup: {type:String},
  cute: {type:String},
  shared: {type:String},
  createAt: {type:Date,default:Date.now}
})


mongoose.model('Guest', GuestSchema)
