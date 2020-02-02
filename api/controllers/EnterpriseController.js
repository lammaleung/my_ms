/**
 * EnterpriseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    json: async function (req, res) {

        var enterprises = await Enterprise.find();
    
        return res.json(enterprises);
    },

};

