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
    // create: async function (req, res) {

    //     if (req.method == "GET")
    //         return res.view('person/create');
    
    //     if (!req.body.Person)
    //         return res.badRequest("Form-data not received.");
    
    //     await Person.create(req.body.Person);
    
    //     return res.ok("Successfully created!");
    // },
    view: async function (req, res) {

        var model = await Inspector.findOne(req.params.id);
    
        if (!model) return res.notFound();
    
        return res.json(model);
    
    },
};

