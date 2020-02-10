/**
 * InspectorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    json: async function (req, res) {

        var inspectors = await Inspector.find();
    
        return res.json(inspectors);
    },
    // create: function (req, res) {

    //     if (req.method == "POST") {
    //         Inspector.create(req.body.Inspector).exec(function (err, model) {
    //             return res.send("Successfully Created!");
    //         });
    //     } 
    // },
};
