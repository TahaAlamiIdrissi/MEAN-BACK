const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3
      },
    description: {
        type: String,
        min: 10
    },
    clone_url: {
        type: String,
        required: true,
        min: 10
    },
    forks: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    pushed_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('project',projectSchema);