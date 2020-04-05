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
    // getPlan: async function (req, res){
    //     var model = await Plan.find().populate('belongs_template');
    //     if (!model) return res.notFound();
    //     return res.json(model.belongs_template);
    // }
    addSample: async function (req, res){
        console.log(req.query.plan_id);
        await Plan.addToCollection(req.query.plan_id, 'has_sample').members(req.query.sample_id);
        // await Task.addToCollection(model.id, 'belongs_enterprise').members(req.query.id);
        return res.send("Added");
    },
    getSample: async function (req, res){
        var model = await Plan.findOne(req.query.plan_id).populate('has_sample');
        if (!model) return res.notFound();
        return res.json(model.has_sample);
    },
   
};

