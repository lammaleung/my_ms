/**
 * PlanController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // view all plan
    json: async function (req, res) {

        var plans = await Plan.find();

        return res.json(plans);
    },
};

