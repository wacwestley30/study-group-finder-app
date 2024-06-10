const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    subject: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Group = model('Group', groupSchema);

module.exports = Group;