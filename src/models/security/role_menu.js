'use strict'

var mongoose = require('mongoose');
var Menu = require('./menu');
var Schema = mongoose.Schema;

var Role_MenuSchema = Schema({
    role: { type: Schema.Types.ObjectId, ref: 'role' },
    menu: [
        {
            _id: { type: String },
            name: { type: String },
            link: { type: String },
            submenu: [
                {
                    _id: { type: String },
                    name: String,
                    link: String,
                    active: { type: Boolean, default: true }
                }
            ]
        }
    ]
},
    { timestamps: true });

module.exports = mongoose.model('role_menu', Role_MenuSchema);