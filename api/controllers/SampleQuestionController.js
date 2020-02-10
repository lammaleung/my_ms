/**
 * SampleQuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    json: async function (req, res) {

        var samples = await Sample_Question.find();
    
        return res.json(samples);
    },

};

