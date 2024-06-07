const { Schema, model } = require('mongoose');
const userSchema = require('./User.js');

// Define Schedule subdoc schema
const scheduleSchema = new Schema({
    sunday: { 
        type: Boolean, 
        default: false 
    },
    monday: { 
        type: Boolean, 
        default: false 
    },
    tuesday: { 
        type: Boolean, 
        default: false 
    },
    wednesday: { 
        type: Boolean, 
        default: false 
    },
    thursday: { 
        type: Boolean, 
        default: false 
    },
    friday: { 
        type: Boolean, 
        default: false 
    },
    saturday: { 
        type: Boolean, 
        default: false 
    },
});

// Define Group schema
const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    members: {
        type: [userSchema],
        required: true,
    },
    schedule: {
        type: [scheduleSchema],
        required: false,
    },
});

const Group = model('Group', groupSchema);

module.exports = { groupSchema, Group };