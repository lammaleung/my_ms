/**
 * Inspector.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    gender: {
      type: 'string',
      enum: ['male', 'female', 'other'],
      defaultsTo: 'other'
    },
    birth: {
      type: 'string'
    },
    education: {
      type: 'string',
      enum: ['High school or lower', 'Higher diploma', 'Associate degree', 'Bachelor\'s degree', 'Master\'s degree or higher', 'Other'],
      defaultsTo: 'Other'
    },
    employment_status: {
      type: 'string',
      enum: ['Employed full time', 'Employed part time', 'Self-employed', 'Student', 'Homemaker', 'Unemployed','Other'],
      defaultsTo: 'Other'
    },
    balance: {
      type: 'number',
      defaultsTo: 0
    },
    rating: {
      type: 'number',
      defaultsTo: 0
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    has_task: {
      collection: 'Task',
      via: 'belongs_inspector'
    },


  },

};

