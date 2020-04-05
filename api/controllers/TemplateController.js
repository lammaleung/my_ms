/**
 * TemplateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getTemplate: async function (req, res) {
        var templates = await Template.find();
        return res.json(templates);
    },
    addPlan: async function (req, res){
        console.log(req.query.tem_id);
        await Template.addToCollection(req.query.tem_id, 'has_plan').members(req.query.plan_id);
        // await Task.addToCollection(model.id, 'belongs_enterprise').members(req.query.id);
        return res.send("Added");
    },
    getPlan: async function (req, res){
        var model = await Template.findOne(req.query.tem_id).populate('has_plan');
        if (!model) return res.notFound();
        return res.json(model.has_plan);
    },
};

