/**
 * Task.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string'
    },
    latitude: {
      type: 'number'
    },
    longitude: {
      type: 'number'
    },
    inspector_no: {
      type: 'number'
    },
    reserved_no: {
      type: 'number'
    },
    completed_no: {
      type: 'number'
    },
    inspector_type: {
      type: 'string'
    },
    industry: {
      type: 'string'
    },
    pay:{
      type: 'number'
    }, 
    start_date:{
      type: 'string'
    },
    end_date:{
      type: 'string'
    },
    payment_reference:{
      type: 'string'
    },
    question_no:{
      type: 'number'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    belongs_inspector: {
      collection: 'Inspector',
      via: 'has_task'
    },
    inspector_completed:{
      collection: 'Inspector',
      via: 'completed_task'
    },
    belongs_enterprise: {
      collection: 'Enterprise',
      via: 'has_task'
    },
    // has_answer:{
    //   collection: 'Answer',
    //   via: 'belongs_task'
    // },
    has_question:{
      collection: 'Question',
      via: 'belongs_task'
    },
    
  },

};

